{{if $is_valid}}
  {{$result}}
{{else}}
  No result
{{/if}}

{{$variable|upper}}

{{$array|@print_r}}

{{foreach $items as $item}}
  {{$item.name}}
{{foreachelse}}
  No items found
{{/foreach}}

{{block name="header"}}
  Header content
{{/block}}
