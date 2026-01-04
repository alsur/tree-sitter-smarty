{literal}
This should be treated as literal text {not a tag}
{/literal}

{function name="myfunc" var1="value1"}
  {if $test}
    This is inside the function
  {/if}
{/function}

{call name="myfunc" var1="value2"}

{capture name="mycap" assign="variable"}
  This captured content
  {foreach $items as $item}
    - {$item}
  {/foreach}
{/capture}