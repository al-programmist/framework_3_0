window.app = {};

// Сюда цепляем все компоненты
import '../../config/js/config';
import { components } from "../../components/_common/_common";

window.addEventListener('DOMContentLoaded', () => {
	components();
});
