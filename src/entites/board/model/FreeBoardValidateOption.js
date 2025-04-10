export default class FreeBoardValidateOption {
	static CATEGORY = {required: true};
	static WRITER = {required: true, pattern: '^.{3,4}$'}
	static PASSWORD = {required: true, placeholder: '비밀번호', pattern: '^.[a-zA-Z0-9!@#$%^&*]{4,15}$'};
	static PASSWORD_CHECK = (password) => {return {required: true, placeholder: '비밀번호 확인', validate: (value) => value === password}};
	static TITLE = {required: true, pattern: '^.{4,99}$'};
	static CONTENT = {required: true, minLength: 4, maxLength: 1999};
}