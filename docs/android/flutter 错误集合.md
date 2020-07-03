# flutter 引入现有 android 工程

[参考文章](https://juejin.im/post/5b72a7c46fb9a009ae46c318)

1. 最新版本 as 新建 flutter 时偶尔出现 bug
2. flutter 与 databinding 兼容很差
3. INPUT 无法放在 row 里


* What went wrong:
Execution failed for task ':app:transformDexArchiveWithExternalLibsDexMergerForDebug'.
> com.android.builder.dexing.DexArchiveMergerException: Error while merging dex archives: 
  Learn how to resolve the issue at https://developer.android.com/studio/build/dependencies#duplicate_classes.
  Program type already present: io.flutter.BuildConfig

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 29s

Compilation is not supported for following modules: flutter_module. Unfortunately you can't have non-Gradle Java modules and Android-Gradle modules in one project.

## error

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:transformDexArchiveWithExternalLibsDexMergerForDebug'.
> com.android.builder.dexing.DexArchiveMergerException: Error while merging dex archives: 
  Learn how to resolve the issue at https://developer.android.com/studio/build/dependencies#duplicate_classes.
  Program type already present: io.flutter.BuildConfig

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 28s
