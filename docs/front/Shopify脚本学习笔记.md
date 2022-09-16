# Shopify脚本学习笔记

## Shopify 与 Shopify 脚本、 Script Editor 应用

- [Shopify](https://zh.wikipedia.org/zh-cn/Shopify)：Shopify Inc.是加拿大的一家跨国电子商务公司，总部位于安大略省渥太华，Shopify也是该公司所有的电子商务平台的名称。[3]Shopify为在线零售商提供一整套服务“包括支付、市场营销、运输和客户契合工具，以简化小型商户开设在线商店的过程”
  - [官方网站](https://www.shopify.com/)
  - [官方中文](https://www.shopify.cn/) 
  - [官方香港](https://www.shopify.hk/)
- [Shopify 脚本和 Script Editor 应用](https://help.shopify.com/zh-CN/manual/checkout-settings/script-editor)：Shopify 脚本是一小段代码，使您能够为客户创建个性化购物车体验和结账体验。
  - 仅支持 plus 商家（氪金）
  - [Shopify 脚本 API](https://help.shopify.com/zh-CN/manual/checkout-settings/script-editor/shopify-scripts)
    - 脚本示例：当客户订购非礼品卡的产品时，产品价格会降低 9 美元。此外还会显示该客户在对您的在线商店的所有访问中花费的总金额
    ```
        customer = Input.cart.customer
        Input.cart.line_items.each do |line_item|
            product = line_item.variant.product
            next if product.gift_card?
            line_item.change_line_price(line_item.line_price - Money.new(cents: 900), message: customer.total_spent)
        end

        Output.cart = Input.cart
    ```
    - 补充知识：
      - [ruby each do 用法](https://blog.csdn.net/leejeff/article/details/50435859) 
      - [ruby next if](http://www.srcmini.com/33772.html)

## Shopify 脚本

### 脚本种类

- 订单商品脚本。
- 发货脚本。
- 付款脚本。

#### 脚本要求和限制

- 可以选择运行在在线商店，或者在线商店、服务器、移动端 sdk。
- 生成结账的自定义应用。
- Tapcart 和 Plobal Apps 移动应用生成器。（暂不清楚 Tapcart 和 Plobal Apps 是什么）
- 每种脚本类型一次只能发布一个脚本。
- 最多可以创建 200 个 Shopify 脚本。
- 订单项目脚本、发货脚本和付款脚本不适用于草稿订单或草稿订单结账。
- 不能访问元字段。（不能直接访问接口字段）
- Shopify 脚本无法访问（页面中的） Shopify Liquid 购物车属性。（不能操作前端页面中的属性）
- 脚本可以访问是否应用了折扣码、折扣金额和折扣类型（固定金额、百分比或运费），但他们无法访问其应用方式（特定购物车或订单项目）。因此，脚本无法访问折扣后的总金额，也无法访问自动折扣。
- 脚本无法向购物车添加商品，也无法提高商品的价格。（即脚本具有滞后性）
- 脚本无法提高运费价格。
- 不支持正则。
- 对模版有要求。（没看懂要求了啥）
- 有资源追踪和监控。
- Shopify 脚本无法进行输入/输出（相对封闭）。但是可以用 `puts` 输入到 Script Editor 应用中的控制台（调试）。
- 脚本不能包含随机计算或基于时间的计算。
- 限制 24,576 个字符以内。
- 订阅产品有限制（什么限制没看懂）。具体参考[订阅和脚本](https://help.shopify.com/zh-CN/manual/checkout-settings/script-editor/scripts-subscriptions)
- 快捷结账会忽略脚本影响，但是实际支付时会按脚本折扣进行。
- 不适用于 Shopify POS (实体店销售)。

### [更新用于脚本的 Liquid 模板](https://help.shopify.com/zh-CN/manual/checkout-settings/script-editor/update-liquid-templates-for-scripts)（**此章应该非常重要**）

#### 模板与脚本的关系

- 模板是界面层，脚本是逻辑层。模板应该显示脚本运行前后的效果。
- 添加脚本后，可能需要更新模板文件。
- 是否有测试环境？

#### Liquid 对象属性
> [Liquid](https://liquid.bootcss.com/basics/introduction/)：Liquid 是一门开源的模板语言，由 Shopify 创造并用 Ruby 实现。它是 Shopify 主题的骨骼，并且被用于加载店铺系统的动态内容。
> 草，又一个搞前端轮子的。

- 购物车对象及其属性。
- 订单项目及其属性。
- [脚本对象](https://shopify.dev/api/liquid/objects#script)。

#### 模板与脚本示例

```
<table>
    <thead>
        <tr>
            <th>Month</th>
            <th>Savings</th>
        </tr>
    </thead>
    <tbody class="line-items">
        {% for item in cart.items %}
        <tr>
            <td>{{ item.product.title }}</td>
            <td>{{ item.quantity }}</td>
            <td>
            {{ item.line_price }}
            {% if item.total_discount > 0 %}
                <s>{{ item.original_line_price }}</s>
                ( {{ item.message }} )
            {% endif %}
            </td>
        </tr>
        {% endfor %}
    </tbody>
    <tfoot class="summary">
        <tr>
            <td colspan="2">Subtotal</td>
            <td>{{ cart.original_total_price | money }}</td>
        </tr>
        <tr>
            <td colspan="2">Discount Savings</td>
            <td>{{ cart.total_discount | money }}</td>
        </tr>
        <tr>
            <td colspan="2">Total</td>
            <td>{{ cart.total_price | money }}</td>
        </tr>
    </tfoot>
</table>


```

### 脚本示例

#### 使用 & 阅读脚本前知识储备

- [mac 安装 ruby 运行环境](https://www.jianshu.com/p/1389dd2a5bd8)。
- [配置 vscode 运行环境](https://www.zhihu.com/question/301181882/answer/531217511)。
- [ruby](https://www.ruby-lang.org/zh_cn/) 与 [ruby 中国社区](https://ruby-china.org/)。
  - [语法教程](https://www.runoob.com/ruby/ruby-tutorial.html)。 

#### 脚本基本类型

- 折扣产品带有特定的标签以提供百分比 (%) 折扣、固定金额（美元）折扣或者这两种折扣的组合。
- 投放逻辑简单或复杂的促销活动（买一送一 (BOGO)）；买两件打九折、买四件打八折）。
- 根据基于数量的价格区间提供动态价格。
- 修改、隐藏发货选项和价格或将其重新排序。
- 修改、隐藏或重新排列支付网关方法。

#### 示例脚本

##### 热门脚本

1. 按消费金额提供购物车分级折扣

```
# ================================ Customizable Settings ================================
# ================================================================
# Tiered Cart Discounts by Spend Threshold
#
# If the cart total is greater than (or equal to) an entered
# threshold, the associated discount is applied to the cart. The
# discount will be spread, as evenly as possible, across all items.
#
# - 'threshold' is the spend amount needed to qualify
# - 'discount_amount' is the dollar discount to apply to the
# cart
# - 'discount_message' is the message to show when a discount
# is applied
# ================================================================
SPENDING_THRESHOLDS = [
  {
    threshold: 150,
    discount_amount: 25,
    discount_message: 'Spend $150 and get $25 off!',
  },
  {
    threshold: 300,
    discount_amount: 50,
    discount_message: 'Spend $300 and get $50 off!',
  },
  {
    threshold: 400,
    discount_amount: 75,
    discount_message: 'Spend $400 and get $75 off!',
  },
]

# ================================ Script Code (do not edit) ================================
# ================================================================
# DollarDiscountApplicator
#
# Applies the entered discount to the supplied line item.
# ================================================================
class DollarDiscountApplicator
  def initialize(discount_message)
    @discount_message = discount_message
  end

  def apply(line_item, discount_amount)
    # 计算折扣价格
    new_line_price = line_item.line_price - discount_amount
    # 改变折扣价格并提示
    line_item.change_line_price(new_line_price, message: @discount_message)
  end
end

# ================================================================
# TieredCartDiscountBySpendCampaign
#
# If the cart total is greater than (or equal to) an entered
# threshold, the associated discount is applied to the cart. The
# discount will be spread, as evenly as possible, across all items.
# ================================================================
class TieredCartDiscountBySpendCampaign
  def initialize(tiers)
    @tiers = tiers.sort_by { |tier| tier[:threshold] }.reverse
  end

  def run(cart)
    # 1. 通过 subtotal_price 判断此时购物车金额是否大于等于折扣价格
    # 2. subtotal_price 的计量单位为美分。
    applicable_tier = @tiers.find { |tier| cart.subtotal_price >= (Money.new(cents: 100) * tier[:threshold]) }
    # 如果找不到，则不对 cart 做改变
    return if applicable_tier.nil?
    # 如果找到折扣，记录此时的提示 message
    discount_applicator = DollarDiscountApplicator.new(applicable_tier[:discount_message])
    # 记录折扣额度
    discount_amount = applicable_tier[:discount_amount]
    # 根据价格排序商品
    items = cart.line_items.sort_by { |line_item| line_item.variant.price }
    # 对购物车进行改变
    self.loop_items(cart, items, discount_amount, discount_applicator)
  end

  def loop_items(cart, line_items, discount_amount, discount_applicator)
    # 根据货物数量计算每个货物应该获得的折扣
    avg_discount = (discount_amount.to_f * (1 / line_items.map(&:quantity).reduce(0, :+))).round(2)
    # 对平均折扣转换为美分
    avg_discount = Money.new(cents: 100) * avg_discount
    # 折扣转换成美分
    discount_amount = Money.new(cents: 100) * discount_amount

    line_items.each_with_index do |line_item, index|
      # 如果折扣用完了，则不再进行折扣
      break if discount_amount <= Money.zero
      # 计算每种商品的折扣，每种商品的折扣 = 平均折扣 * 商品数量
      line_discount = avg_discount * line_item.quantity
      # 如果是最后一位商品，或者总体折扣价格少于该商品予折扣价格（意思是剩余折扣已经不能 cover 计算出的折扣）
      if discount_amount < line_discount || index == (line_items.size - 1)
        # 如果剩余折扣比原本购买金额多，则使用原本金额做折扣（不能倒贴钱）；如果剩余折扣少于原本金额，则使用剩余折扣。
        discount_update = line_item.line_price > discount_amount ? discount_amount : line_item.line_price
      else
        # 使用购物金额和折扣金额最低的那个做折扣（比如折扣是 10 美元，但是该商品总共就值 1 美元，不能倒贴 9 美元）
        discount_update = line_item.line_price > line_discount ? line_discount : line_item.line_price
      end
      # 计算剩余折扣金额
      discount_amount -= discount_update
      # 根据金额显示提示
      discount_applicator.apply(line_item, discount_update)
    end
  end
end

CAMPAIGNS = [
  # 折扣规则，可以多条
  TieredCartDiscountBySpendCampaign.new(SPENDING_THRESHOLDS),
]

# 每条折扣规则都要对商品进行计算
CAMPAIGNS.each do |campaign|
  campaign.run(Input.cart)
end

# 输出
Output.cart = Input.cart
```

2. 按消费金额提供分级折扣

```
# ================================ Customizable Settings ================================
# ================================================================
# Tiered Discounts by Spend Threshold
#
# If the cart total is greater than (or equal to) an entered
# threshold, the associated discount is applied to each item.
#
# - 'threshold' is the spend amount needed to qualify
# - 'discount_type' is the type of discount to provide. Can be
# either:
# - ':percent'
# - ':dollar'
# - 'discount_amount' is the percentage/dollar discount to
# apply (per item)
# - 'discount_message' is the message to show when a discount
# is applied
# ================================================================
SPENDING_THRESHOLDS = [
  {
    threshold: 30,
    discount_type: :percent,
    discount_amount: 10,
    discount_message: 'Spend $30 and get 10% off!',
  },
  {
    threshold: 50,
    discount_type: :percent,
    discount_amount: 15,
    discount_message: 'Spend $50 and get 15% off!',
  },
  {
    threshold: 100,
    discount_type: :percent,
    discount_amount: 20,
    discount_message: 'Spend $100 and get 20% off!',
  },
]

# ================================ Script Code (do not edit) ================================
# ================================================================
# DiscountApplicator
#
# Applies the entered discount to the supplied line item.
# ================================================================
class DiscountApplicator
  def initialize(discount_type, discount_amount, discount_message)
    @discount_type = discount_type
    @discount_message = discount_message

    @discount_amount = if discount_type == :percent
      1 - (discount_amount * 0.01)
    else
      Money.new(cents: 100) * discount_amount
    end
  end

  def apply(line_item)
    new_line_price = if @discount_type == :percent
      line_item.line_price * @discount_amount
    else
      [line_item.line_price - (@discount_amount * line_item.quantity), Money.zero].max
    end

    line_item.change_line_price(new_line_price, message: @discount_message)
  end
end

# ================================================================
# TieredDiscountBySpendCampaign
#
# If the cart total is greater than (or equal to) an entered
# threshold, the associated discount is applied to each item.
# ================================================================
class TieredDiscountBySpendCampaign
  def initialize(tiers)
    @tiers = tiers.sort_by { |tier| tier[:threshold] }.reverse
  end

  def run(cart)
    applicable_tier = @tiers.find { |tier| cart.subtotal_price >= (Money.new(cents: 100) * tier[:threshold]) }
    return if applicable_tier.nil?

    discount_applicator = DiscountApplicator.new(
      applicable_tier[:discount_type],
      applicable_tier[:discount_amount],
      applicable_tier[:discount_message]
    )

    cart.line_items.each do |line_item|
      next if line_item.variant.product.gift_card?
      discount_applicator.apply(line_item)
    end
  end
end

CAMPAIGNS = [
  TieredDiscountBySpendCampaign.new(SPENDING_THRESHOLDS),
]

CAMPAIGNS.each do |campaign|
  campaign.run(Input.cart)
end

Output.cart = Input.cart
```

- [Ruby中的关键字nil](https://blog.csdn.net/wangjianno2/article/details/51704351)
- [Ruby Integer to_f用法及代码示例](https://vimsky.com/examples/usage/ruby-integer-to_f-function-with-example.html)
- [Ruby 注释](https://www.runoob.com/ruby/ruby-comment.html)
- [Ruby 中保存 x 位小数](https://apidock.com/ruby/Float/round)
- [Ruby 中 each_with_index 用法](https://vimsky.com/examples/usage/ruby-enumerator-each_with_index-function.html)
- [Ruby 中的 attr_accessor 方法](http://lazybios.com/2017/01/what-is-attr-accessor-in-ruby/)

#### [测试和调试 Shopify 脚本](https://help.shopify.com/zh-CN/manual/checkout-settings/script-editor/test)