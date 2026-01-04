{{* This is a comment with double delimiters *}}
{{$variable|upper}}
{{if $condition}}
  {{$result}}
{{else}}
  No result
{{/if}}

{{$array|@print_r}}

{{foreach from=$items item=item}}
  {{$item.name}}
{{foreachelse}}
  No items
{{/foreach}}

{{block name="test"}}
  Content
{{/block}}

{* Single delimiter comment *}
{$variable|lower}
{if $condition}
  {$result}
{/if}
