# [使用中间件、拦截器和过滤器构建日志系统](https://juejin.cn/post/6844904098689449998)

## log4js 

[log4js](https://github.com/log4js-node/log4js-node) 是比 `console` 更为强大的日志输出类（[入门介绍](https://juejin.cn/post/6844903442054381582)），适合生产级使用。

### 基本概念

log4js 的三个基本概念：`Logger`、`Appender`、`Layout`。

#### Logger

`Logger` 负责的是处理`日志内容`，包括内容的分级 `Level` 和分类 `Category`。

##### - Level

log4js 的日志分为九个等级，各个级别的名字和权重如下：

```
{
  ALL: new Level(Number.MIN_VALUE, "ALL"),
  TRACE: new Level(5000, "TRACE"),
  DEBUG: new Level(10000, "DEBUG"),
  INFO: new Level(20000, "INFO"),
  WARN: new Level(30000, "WARN"),
  ERROR: new Level(40000, "ERROR"),
  FATAL: new Level(50000, "FATAL"),
  MARK: new Level(9007199254740992, "MARK"), // 2^53
  OFF: new Level(Number.MAX_VALUE, "OFF")
}
```

`All` 和 `OFF` 一般不会直接在业务代码中使用（此处待研究），剩下的七个级别对应 logger 里的七个方法，调用方法意味着对该日志进行里定级。

##### - Category

```
// file: set-catetory.js
var log4js = require('log4js');
var logger = log4js.getLogger('example');
logger.debug("Time:", new Date());
// 输出
[2016-08-21 01:16:00.212] [DEBUG] example - Time: 2016-08-20T17:16:00.212Z
```

在通过 getLogger 获取 Logger 实例时，通过传入字符串来指定 Logger 实例属于哪个类别（category）。相当于在另一个维度上，对日志进行了分类。

#### Appender

Appender（App-ender）负责日志的输出位置，[这里](https://github.com/log4js-node/log4js-node)可以看到全部的列表。

配合代码解释下：

```
var log4js = require('log4js');
log4js.configure({
  appenders: [{
    type: 'logLevelFilter',
    level: 'DEBUG',
    category: 'category1',
    appender: {
      type: 'file',
      filename: 'default.log'
    }
  }]
})
var logger1 = log4js.getLogger('category1');
var logger2 = log4js.getLogger('category2');
logger1.debug("Time:", new Date());
logger1.trace("Time:", new Date());
logger2.debug("Time:", new Date());
```

- `logLevelFilter` 和 `level` 对日志的级别进行过滤，会输出所有权重大于等于 `DEBUG` 的日志。
- 通过 `category` 选择输出日志的类别，该配置也接收数组（eg：['category1', 'category2']）。

#### Layout

Layout 负责定制日志的输出格式，log4js 内置了四种类型的格式：

- messagePassThrough：仅仅输出日志的内容；
- basic：在日志的内容前面会加上时间、日志的级别和类别，通常日志的默认 layout；
- colored/coloured：在 basic 的基础上给日志加上颜色，appender Console 默认使用的就是这个 layout；
- pattern：这是一种特殊类型，可以通过它来定义任何你想要的格式。

> pattern 的说明符可以参考[文档](https://github.com/log4js-node/log4js-node)。

## 代码

### `src/config/log4js.ts`

```
import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../../logs'); // 日志要写入哪个目录

const log4jsConfig = {
  appenders: {
    console: {
      type: 'console', // 会打印到控制台
    },
    access: {
      type: 'dateFile', // 会写入文件，并按照日期分类
      filename: `${baseLogPath}/access/access.log`, // 日志文件名，会命名为：access.20200320.log
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExt: true, // 是否保留文件后缀
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern:
          '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      // 日志文件按日期（天）切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
  pm2: true, // 使用 pm2 来管理项目时，打开
  pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};

export default log4jsConfig;

```

### `src/utils/log4js.ts`

```
import * as Path from 'path';
import * as Log4js from 'log4js';
import * as Moment from 'moment';
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';
import config from '../config/log4js';
import * as Util from 'util';
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly lineNumber: number,
    public readonly columnNumber: number,
    public readonly path?: string,
  ) {}
}

Log4js.addLayout(
  'Awesome-nest',
  (logConfig: any) => (logEvent: Log4js.LoggingEvent): string => {
    let moduleName = '';
    let position = '';
    // 日志组装
    const messageList: string[] = [];
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        // 显示触发日志的坐标（行，列）
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`;
        }
        return;
      }

      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true);
      }

      messageList.push(value);
    });
    // 日志组成部分
    const messageOutput: string = messageList.join(' ');
    const positionOutput: string = position ? ` [${position}]` : '';
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
    const dateOutput = `${Moment(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    )}`;
    const moduleOutput: string = moduleName
      ? `[${moduleName}] `
      : '[LoggerService] ';
    let levelOutput = `[${logEvent.level}] ${messageOutput}`;
    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput);
        break;
      default:
        levelOutput = Chalk.grey(levelOutput);
        break;
    }
    return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(
      moduleOutput,
    )}${levelOutput}${positionOutput}`;
  },
);

Log4js.configure(config);

const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args) {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args) {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args) {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args) {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args) {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args) {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}

```