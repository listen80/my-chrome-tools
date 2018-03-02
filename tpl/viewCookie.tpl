<div class="app-wrap">
	<div class="content">
		<table class="table">
			<colgroup span="2" align="left"></colgroup>
			<colgroup span="2" align="right"></colgroup>
			<colgroup align="right" width="200"></colgroup>
			<thead>
				<tr>
					<th>#</th>
					<th>Key</th>
					<th>Value</th>
					<th>Domain</th>
					<th>Expires</th>
				</tr>
			</thead>
			<tbody>
				{if $d.length}
				{for $d}
				<tr>
					<td>{$k + 1}</td>
					<td>{$v.name}</td>
					<td>
						<div style="word-break: break-all;">{decodeURIComponent($v.value)}</div>
					</td>
					<td><span>{$v.domain}</span></td>
					<td>{if $v.session}Session{else}{new Date($v.expirationDate * 1000).toLocaleString()}{/if}</td>
				</tr>
				{/for}
				{else}
				<tr>
					<td colspan="5" style="text-align: center">暂无</td>
				</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>