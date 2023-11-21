import { FieldAvatar } from '../../components/field-avatar/field-avatar';

window.app.FieldAvatar = FieldAvatar;

window.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.js-field-avatar').forEach((element) => {
		new app.FieldAvatar(element);
	});
});
