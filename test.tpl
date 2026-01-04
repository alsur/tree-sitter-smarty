{{if $is_valid_cookie}}
  {{$cookie_name}}
{{else}}
  No cookie
{{/if}}

{{$variable|upper}}

{{foreach $items as $item}}
  {{$item.name}}
{{foreachelse}}
  No items
{{/foreach}}
