# tree-sitter-smarty

[![Grammar Version](https://img.shields.io/badge/version-d3e6641-blue)](https://github.com/alsur/tree-sitter-smarty/commit/d3e66413061437e59788ee9d3cd8f0376497bd38)

Enhanced Tree-sitter grammar for Smarty 3 template engine.

## Features

✅ **Full Smarty 3 Support**: All major control structures and built-in functions
✅ **Dual Delimiter Support**: Both `{}` and `{{}}` styles work simultaneously
✅ **Smarty 2 & 3 Syntax**: Supports both `foreach` syntaxes
✅ **Complete Function Coverage**: `{include}`, `{block}`, `{literal}`, `{function}`, `{call}`, `{capture}`, `{nocache}`

## What's Enhanced

This is a **fork and enhancement** of [Kibadda/tree-sitter-smarty](https://github.com/Kibadda/tree-sitter-smarty) with the following additions:

### Added Control Structures
- **{for}** - For loops with step support
- **{while}** - While loops
- **{foreachelse}** - Alternative for empty foreach loops

### Added Built-in Functions
- **{literal}** - Literal content (no parsing)
- **{function}** - Template function definitions
- **{call}** - Call template functions
- **{capture}** - Capture output to variables
- **{nocache}** - Disable caching for blocks

### Syntax Improvements
- **Dual delimiter support** via regex patterns (`/\{+/` and `/\\}+/`)
- **Smarty 2 foreach syntax**: `{foreach from=$items item=item}`
- **Smarty 3 foreach syntax**: `{foreach $array as $item}`
- **Improved comment parsing** for `{* *}` and `{{* *}}`

## Usage

### Neovim

```lua
local parsers = require("nvim-treesitter.parsers").get_parser_configs()

parsers.smarty = {
  install_info = {
    url = "https://github.com/alsur/tree-sitter-smarty",
    files = { "src/parser.c" },
    branch = "main",
  },
  filetype = "smarty",  -- Optional: Associate with .tpl files
}
```

Then follow [adding queries](https://github.com/nvim-treesitter/nvim-treesitter#adding-queries).

### Helix Editor

Add to `~/.config/helix/languages.toml`:

```toml
[language-server.smarty-language-server]
command = "smarty-language-server"
args = ["--stdio"]

[[grammar]]
name = "smarty"
source = { git = "https://github.com/alsur/tree-sitter-smarty", rev = "d3e66413061437e59788ee9d3cd8f0376497bd38" }
```

### Other Editors

Check your editor's Tree-sitter configuration documentation.

## Supported Syntax

### Control Structures

```smarty
{{if $condition}}
  {{if $nested}}
    Nested content
  {{elseif $other}}
    ElseIf content
  {{else}}
    Else content
  {{/if}}
{{/if}}

{{foreach $items as $item}}
  {{$item.name}}
{{foreachelse}}
  No items
{{/foreach}}

{{foreach from=$items item=item}}
  {{item.name}}
{{/foreach}}

{{for $i=0 to 10 step 2}}
  {{$i}}
{{/for}}

{{while $condition}}
  Content
{{/while}}
```

### Built-in Functions

```smarty
{{include file="header.tpl" assign="header"}}

{{block name="content"}}
  Default content
{{/block}}

{{literal}}
  <script>{$var}</script>
{{/literal}}

{{function name="link" url="#"}}
  <a href="{{$url}}">{{block name="content"}}Link{{/block}}</a>
{{/function}}

{{call name="link" url="https://example.com"}}
  {{block name="content"}}Visit{{/block}}
{{/call}}

{{capture name="mycap"}}
  Content to capture
{{/capture}}
{{$mycap}}

{{nocache}}
  {$timestamp|date_format:"%Y-%m-%d %H:%M:%S"}
{{/nocache}}
```

### Modifiers and Variables

```smarty
{{$variable}}
{{$array.key}}
{{$variable|upper}}
{{$variable|truncate:30:"..."}}
{{$variable|default:"default value"}}
```

### Comments

```smarty
{* This is a Smarty comment *}
{{* This works with double delimiters too *}}
```

## Relationship with zed-smarty

This grammar is used by the [zed-smarty](https://github.com/alsur/zed-smarty) extension for the Zed editor.

## Development

### Test the Grammar

```bash
# Parse a test file
tree-sitter parse tests/smarty/basic.tpl

# Generate parser from grammar.js
tree-sitter generate

# Run tests
tree-sitter test
```

### Modify the Grammar

1. Edit `grammar.js`
2. Generate: `tree-sitter generate`
3. Test: `tree-sitter test`
4. Commit changes

**Important**: If you're using this with zed-smarty, you must update the commit SHA in `zed-smarty/extension.toml` after making changes.

## Versioning

Current version: **d3e6641** (2025-01-05)

This grammar is actively maintained for use with zed-smarty. The main branch is always stable and ready to use.

## Credits

- **Original**: [Kibadda/tree-sitter-smarty](https://github.com/Kibadda/tree-sitter-smarty)
- **Enhanced by**: [alsur](https://github.com/alsur)

## License

MIT

## See Also

- [Zed Editor](https://zed.dev) - The hackable code editor
- [Smarty 3 Documentation](https://www.smarty.net/docs/en/) - Official documentation
- [Tree-sitter](https://tree-sitter.github.io/) - Parser generator tool
