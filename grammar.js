module.exports = grammar({
  name: 'smarty',

  extras: $ => [
    $.comment,
    /\s+/,
  ],

  rules: {
    template: $ => repeat($._smarty),

    _smarty: $ => choice(
      $.inline,
      $.include,
      $.block,
      $.text,
      $.foreach,
      $.for,
      $.while,
      $.if,
      $.nocache,
      $.literal,
      $.function,
      $.call,
      $.capture,
    ),

    _nested: $ => choice(
      $.inline,
      $.include,
      $.text,
      $.foreach,
      $.for,
      $.while,
      $.if,
      $.nocache,
      $.function,
      $.capture,
    ),

    comment: $ => seq(/\{+/, '*', /[^*]/, '*', /\}+/),

    inline: $ => seq(
      /\{+/,  // Soporta { y {{
      alias($.text, $.php),
      repeat(seq(
        '|',
        $.modifier,
      )),
      /\}+/   // Soporta } y }}
    ),

    include: $ => seq(
      /\{+\s*include/, repeat($.parameter), /\}+/,
    ),

    block: $ => seq(
      /\{+\s*block/, repeat($.parameter), /\}+/,
      alias(repeat($._nested), $.body),
      /\{+\/block\}+/
    ),

    foreach: $ => seq(
      /\{+\s*foreach\s+/,
      choice(
        // Smarty 3 syntax: {foreach $array as $item}
        seq(
          /\$\w+/,
          /\s+as\s+/,
          /\$\w+/,
          optional(seq(/\s+=>\s+/, /\$\w+/))
        ),
        // Smarty 2 syntax: {foreach from=$array item=$item}
        seq(
          $.parameter,
          repeat(seq(/\s+/, $.parameter))
        )
      ),
      /\s*\}+/,
      field('body', alias(repeat($._nested), $.body)),
      field('alternative', optional($.foreach_else)),
      /\{+\/foreach\}+/
    ),

    foreach_else: $ => seq(/\{+\s*foreachelse\}+/, alias(repeat($._nested), $.body)),

    for: $ => seq(
      /\{+\s*for/, /\$[^\s=]+\s*=\s*\d+/, 'to', /\d+/,
      optional(seq('step', /\d+/)), /\}+/,
      field('body', alias(repeat($._nested), $.body)),
      /\{+\/for\}+/
    ),

    while: $ => seq(
      /\{+\s*while/, field('condition', alias(/[^\}]+/, $.text)), /\}+/,
      field('body', alias(repeat($._nested), $.body)),
      /\{+\/while\}+/
    ),

    if: $ => seq(
      /\{+\s*if/, field('condition', alias(/[^\}]+/, $.text)), /\}+/,
      field('body', alias(repeat($._nested), $.body)),
      repeat(field('alternative', $.else_if)),
      optional(field('alternative', $.else)),
      /\{+\/if\}+/
    ),

    else_if: $ => seq(/\{+\s*elseif/, field('condition', alias(/[^\}]+/, $.text)), /\}+/, field('body', alias(repeat($._nested), $.body))),

    else: $ => seq(/\{+\s*else\}+/, field('body', alias(repeat($._nested), $.body))),

    nocache: $ => seq(/\{+\s*nocache\}+/, field('body', alias(repeat($._nested), $.body)),
      /\{+\/nocache\}+/),

    literal: $ => seq(
      /\{+\s*literal\}+/,
      field('body', alias(repeat($._smarty), $.text)),
      /\{+\/literal\}+/
    ),

    function: $ => seq(
      /\{+\s*function\s+/,
      repeat($.parameter),
      /\}+/,
      field('body', alias(repeat($._nested), $.body)),
      /\{+\/function\}+/
    ),

    call: $ => seq(
      /\{+\s*call\s+/,
      repeat($.parameter),
      /\}+/
    ),

    capture: $ => seq(
      /\{+\s*capture\s+/,
      repeat($.parameter),
      /\}+/,
      field('body', alias(repeat($._nested), $.body)),
      /\{+\/capture\}+/
    ),

    modifier: $ => seq(
      /[^|:}]+/,
      repeat(seq(
        ':',
        alias(/[^|:}]+/, $.parameter),
      )),
    ),

    parameter: $ => /[^\s=]+[\s]*=[\s]*('[^']*'|"[^"]*"|\[[^]]*]|[\$][^\s]*|[^\s}]+)/,

    text: $ => prec(-1, /[^\s\|{*}-]([^\|{*}]*[^\|{*}-])?/),
  },
});
