<script lang="ts">
	let {
		background,
		disabled,
		errorText,
		icon,
		label,
		leading,
		placeholder = '',
		readonly,
		required,
		supportingText,
		trailing,
		...props
	}: TextField = $props();
</script>

<div
	class="field-container"
	style:--background={background}
	style:--accent={errorText && 'var(--error)'}
>
	<label class="text-field" class:readonly>
		<input {disabled} {placeholder} {readonly} {...props} />
		{#if leading}
			<span class="leading">
				{@render leading()}
			</span>
		{/if}
		<span class="label">{label}{required && '*'}</span>
		{#if trailing}
			<span class="trailing">
				{@render trailing()}
			</span>
		{/if}
	</label>

	{#if errorText}
		<div class="supporting-text">{errorText}</div>
	{:else if supportingText}
		<div class="supporting-text">
			{required && '* '}{supportingText}
		</div>
	{/if}
</div>

<style lang="scss">
	.field-container {
		width: 100%;
	}

	.text-field {
		align-items: center;
		border-radius: 4px;
		box-shadow: inset 0 0 0 1px var(--accent, var(--outline));
		caret-color: var(--primary);
		display: flex;
		font: var(--body-large);
		height: 56px;
		padding: 0 12px;
		position: relative;
		transition: box-shadow 0.2s;
		width: 100%;

		&:hover {
			box-shadow: inset 0px 0px 0px 1px var(--on-surface);
		}

		&:focus-within,
		&:active {
			box-shadow: inset 0 0 0 3px var(--accent, var(--primary));

			.label {
				background: var(--background, var(--surface));
				color: var(--accent, var(--primary));
				font: var(--body-small);
				transform: translateY(-28px);
			}
		}

		&:has(.leading) {
			padding-left: 0;

			&:focus-within,
			&:active {
				.label {
					transform: translate(-36px, -28px);
				}
			}

			input {
				padding-left: 52px;

				&:not(:placeholder-shown),
				&:autofill,
				&:-webkit-autofill {
					& ~ .label {
						transform: translate(-36px, -28px);
					}
				}
			}
		}

		&:has(.trailing) {
			padding-right: 0;

			input {
				padding-right: 52px;
			}
		}
	}

	input {
		cursor: text;
		height: 100%;
		left: 0;
		padding: 0 16px;
		position: absolute;
		top: 0;
		width: 100%;

		&::placeholder {
			color: transparent;
			user-select: none;
		}

		&:autofill,
		&:-webkit-autofill {
			background-clip: text;
			-webkit-text-fill-color: var(--on-surface);
		}

		&:not(:placeholder-shown),
		&:autofill,
		&:-webkit-autofill {
			& ~ .label {
				background: var(--background, var(--surface));
				transform: translateY(-28px);
				font: var(--body-small);
			}
		}
	}

	.label {
		color: var(--accent, var(--on-surface));
		padding: 0 4px;
		pointer-events: none;
		transition:
			color 0.2s,
			font 0.2s,
			transform 0.2s;
		user-select: none;
	}

	.leading,
	.trailing {
		display: grid;
		place-content: center;
		width: 48px;
	}

	.trailing {
		margin-left: auto;
	}

	.supporting-text {
		color: var(--accent, var(--on-surface-variant));
		font: var(--body-small);
		margin: 4px 16px 0;
	}
</style>
