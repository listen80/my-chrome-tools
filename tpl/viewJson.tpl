{if $d === null}
<span class="null">null</span>
{elseif $d === undefined}
<span class="undefined">undefined</span>
{elseif $d.constructor === Object || $d.constructor === Array}
<span class="symbol">{$d.constructor === Object ? '&#123;' : '['}</span>{if Object.keys($d).length}<span class="expand"></span><div class="indent">
	{for $d}
	<div class="line">
		<span class="key">{$k}</span><span class="colon">:</span>{include "viewJson" $v}
	</div>
	{/for}
</div>{/if}<span class="dot">...</span><span class="symbol">{$d.constructor === Object ? '&#125;' : ']'}</span>
{elseif $d.constructor === String}
<span class="string">"{$d}"</span>
{elseif $d.constructor === Number}
<span class="number">{$d}</span>
{elseif $d.constructor === Boolean}
<span class="boolean">{$d}</span>
{else}
<span class="other">{$d}</span>
{/if}