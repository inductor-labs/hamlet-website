(function(){window.multiInput=Example({code:"\nmodel =\n  min: 1\n  max: 10\n  value: Observable 5",template:'\n%input(type="text" @value)\n%select(@value options=[@min..@max])\n%input(type="range" @value @min @max)\n%progress(@value @max)',header:"",description:"",selector:"#multi-input"}),window.demos={markdownEditor:Example({code:'\nconverter = new Showdown.converter()\n\nmodel =\n  value: Observable "Type some *markdown* here!"\n  output: ->\n    html = converter.makeHtml @value()\n    $(html).get()',template:"\n%h4 Input\n%textarea(@value)\n%h4 Output\n.content= @output",competitorName:"React JS",competitorUrl:"http://jsfiddle.net/mdiebolt/ahpCA",header:"Small footprint",description:"Hamlet weighs in at a fraction the size of Angular JS and React JS, but is nearly as powerful as these large frameworks. Writing maintainable, understandable code for JavaScript applications has never been easier.",comparison:"Like React, Hamlet has a compile step. However, a compiled Hamlet template requires no initialization, change, or teardown code for bindings to work.",selector:"#markdown-editor"}),todo:Example({code:'\nitems = Observable []\n\ncompleteAll = Observable(false)\ncompleteAll.observe (val) ->\n  items.forEach (i) ->\n    i.checked(val)\n\nmodel =\n  removeFinished: ->\n    @finished().forEach items.remove\n    @completeAll(false)\n  completeAll: completeAll\n  hideMarkComplete: ->\n    "hidden" unless @items().length\n  value: Observable ""\n  items: items\n  finished: ->\n    @items.filter (item) ->\n      item.checked()\n  finishedCount: ->\n    @finished().length\n  unfinished: ->\n    @items.filter (item) ->\n      !item.checked()\n    .length\n  add: (e) ->\n    return unless e.keyCode is 13\n    item =\n      description: @value()\n      checked: Observable false\n      class: ->\n        "completed" if item.checked()\n\n    @items.push(item)\n    @value ""',template:'\n- item = ->\n  %li\n    %label\n      %input(type="checkbox" @checked)\n      %span.item(@class)= @description\n\n%h2 Todos by Hamlet\n%input(type="text" @value placeholder="What needs to be done?" onkeydown=@add)\n%label(class=@hideMarkComplete)\n  %input(type="checkbox" checked=@completeAll)\n  %span Mark all as complete\n%ul\n  - each @items, item\n.totals(class=@hideMarkComplete)\n  .unfinished\n    %span.count= @unfinished\n    left\n  .clear(click=@removeFinished)\n    Clear\n    %span.count= @finishedCount\n    items',competitorName:"Backbone",competitorUrl:"http://jsfiddle.net/mdiebolt/2fkLY",header:"CoffeeScript",description:"Take full advantage of CoffeeScript in your templates. Hamlet doesn't use a crippled templating language and supports embedding arbitrary CoffeeScript expressions. Write expressive, intuitive templates that can be understood at a glance.",comparison:"Compared to Backbone, Hamlet is much less verbose. Using Hamlet, you'll never have to set up handlers or manually sync state between your model and the DOM. Eliminating this entire class of application code reduces complexity and improves maintainability.",selector:"#todo"}),shoppingCart:Example({code:'\nnullCategory = {name: "Select...", value: -1, products: []}\nnullProduct = {name: "Select...", value: -1, price: 0}\n\ncategories = Observable [nullCategory].concat data.categories\n\nLine = ->\n  self =\n    categories: categories\n    selectedCategory: Observable(categories()[0])\n    quantity: Observable(1)\n    subtotal: Observable(0)\n    price: ->\n      @selectedProduct().price\n    products: ->\n      [nullProduct].concat(@selectedCategory().products)\n    selectedProduct: Observable(nullProduct)\n    subtotal: ->\n      @price() * @quantity()\n    formattedSubtotal: ->\n      "$" + @subtotal().toFixed(2)\n    toJSON: ->\n      if @selectedProduct()\n        { productName: @selectedProduct(), quantity: @quantity() }\n    click: (e) ->\n      e.preventDefault()\n      lines.remove(self)\n\n  self.selectedCategory.observe (category) ->\n    self.selectedProduct(nullProduct)\n\n  self\n\nlines = Observable([Line()])\n\nmodel =\n  addLine: ->\n    lines.push(Line())\n  lines: lines\n  submitOrder: ->\n    json = JSON.stringify lines.map (l) ->\n      l.toJSON()\n\n    alert("Could now send this to server: " + json)\n  total: ->\n    sum = lines.reduce (total, line) ->\n      total + line.subtotal()\n    , 0\n  formattedTotal: ->\n    "$" + @total().toFixed(2)',template:'\n-th = ["Category", "Product", "Price", "Quantity", "Subtotal", ""]\n%table\n  %thead\n    %tr\n      - each th, (name) ->\n        %th= name\n  %tbody\n    - each @lines, ->\n      %tr\n        %td.category\n          %select(options=@categories value=@selectedCategory)\n        %td.product\n          %select(options=@products value=@selectedProduct)\n        %td.price= @price\n        %td.quantity\n          %input(type="number" value=@quantity)\n        %td.subtotal= @formattedSubtotal\n        %td.remove\n          %a(href="#" @click) Remove\n%hr\n.sum\n  Total value:\n  %span.total= @formattedTotal\n%button(click=@addLine) Add product\n%button(click=@submitOrder) Submit order',competitorName:"Knockout JS",competitorUrl:"http://jsfiddle.net/mdiebolt/h2MaW",header:"Powerful bindings",description:"Create impressive applications in minutes. Coding a cascading select box is quite simple with Hamlet.",comparison:"Knockout is most similar to Hamlet. However, Hamlet templates take Knockout style data bindings to their logical conclusion, omitting any attributes and binding directives that Knockout requires.",selector:"#shopping-cart"}),filteredList:Example({code:'\nsearch = Observable ""\noptions = [\n  {name: "Alphabetical", value: "name"}\n  {name: "Newest", value: "age"}\n]\n\ncompareAge = (a, b) ->\n  a.age() - b.age()\n\ncompareName = (a, b) ->\n  aName = a.name().toLowerCase()\n  bName = b.name().toLowerCase()\n\n  if aName < bName\n    return -1\n  else if aName > bName\n    return 1\n  else\n    return 0\n\nincludes = (a, b) ->\n  a.toLowerCase().indexOf(b.toLowerCase()) >= 0\n\nPhone = (I={}) ->\n  self =\n    age: Observable(I.age)\n    src: Observable(I.imageUrl)\n    name: Observable(I.name)\n    snippet: Observable(I.snippet)\n    class: ->\n      "hidden" unless includes(self.name(), search())\n\nmodel =\n  sortBy: Observable options[1]\n  options: options\n  search: search\n  phones: Observable data.phones.map(Phone)\n  sorted: ->\n    val = @sortBy().value\n\n    if val is "name"\n      @phones().sort(compareName)\n    else if val is "age"\n      @phones().sort(compareAge)',template:'\n%label\n  Search:\n  %input(value=@search type="text")\n%label\n  Sort by:\n  %select(value=@sortBy @options)\n%ul\n  -each @sorted, ->\n    %li.phone(@class)\n      %img(@src)\n      .name= @name\n      .description= @snippet',competitorName:"Angular JS",competitorUrl:"http://jsfiddle.net/mdiebolt/BChyV",header:"Kill Complexity",description:"Avoid working with over-engineered frameworks without sacrificing a great interactive experience. Compare the Hamlet version with an Angular JS tutorial that is 12 steps long.",comparison:"Angular JS is a very large and complex framework that does much more than templating. Hamlet focuses on making it dead simple to create powerful, understandable templates with a minimal amount of time to get up and running.",selector:"#filtered-list"}),emailClient:Example({code:'\nmonths = [\n  "Jan", "Feb", "Mar", "Apr", "May", "Jun"\n  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"\n]\n\nhumanDate = (date) ->\n  months[date.getMonth()] + \' \' + date.getDate()\n\nMessage = (I={}) ->\n  self =\n    class: ->\n      "active" if activeMessage() is self\n    click: ->\n      activeMessage(self)\n    date: Observable(I.date)\n    formattedDate: ->\n      humanDate(self.date())\n    to: Observable(I.to)\n    from: Observable(I.from)\n    subject: Observable(I.subject)\n    body: Observable(I.body)\n\nMailbox = (I={}) ->\n  self =\n    class: ->\n      "active" if activeMailbox() is self\n    click: ->\n      activeMailbox(self)\n      activeMessage(nullMessage)\n    count: ->\n      @messages().length\n    messages: Observable I.messages.map(Message)\n    name: Observable(I.name)\n\nnullMailbox = Mailbox\n  name: ""\n  messages: []\n\nnullMessage = Message\n  subject: ""\n  to: ""\n  from: ""\n  date: new Date\n  body: ""\n\nactiveMailbox = Observable(nullMailbox)\nactiveMessage = Observable(nullMessage)\n\nmailboxes = data.email.map(Mailbox)\n\nmodel =\n  mailboxes: mailboxes\n  activeMailbox: activeMailbox\n  messageClass: ->\n    "hidden" unless @body().length\n  tableHeaders: ["Date", "Subject", "From", "To"]\n  messages: ->\n    @activeMailbox().messages()\n  showMail: ->\n    "hidden" unless @activeMailbox().count()\n  hideMail: ->\n    "hidden" if @activeMailbox().count()\n\n["subject", "to", "from", "formattedDate", "body"].forEach (method) ->\n  model[method] = ->\n    activeMessage()[method]()\n\nmodel',template:"\n.email-client\n  .left\n    %h4 Mailboxes\n    %nav\n      - each @mailboxes, ->\n        .mailbox(@class @click)\n          =@name\n          %span.count= @count\n  %main\n    %h2(class=@hideMail) Hamstermail\n    %table(class=@showMail)\n      %tr\n        - each @tableHeaders, (name) ->\n          %th= name\n      - each @messages, ->\n        %tr(@click @class)\n          %td= @formattedDate\n          %td= @subject\n          %td= @from\n          %td= @to\n    .email(class=@messageClass)\n      %strong From\n      %div= @from\n      %strong To\n      %div= @to\n      %strong Date\n      %div= @formattedDate\n      %hr\n      %h3= @subject\n      %div= @body",competitorName:"Ember JS",competitorUrl:"http://jsfiddle.net/mdiebolt/9mN48",header:"Not a framework",description:"Hamlet simplifies your templating complexity by an order of magnitude and eliminates the need for a view abstraction in addition to a template. For many applications you won\u2019t need to use a full blown MVC framework at all. This allows your team to iterate quickly without the overhead of learning a whole framework.",comparison:"Unlike Ember, Hamlet doesn't start with the assumption that you'll be building a large single page JavaScript application. This makes it a great fit for small, encapsulated, reusable widgets. However, since Hamlet focuses on templating, it's a perfect fit for the presentation layer when your application grows large enough to warrant that organization.",selector:"#email-client"})}}).call(this);