export default class FreeBoardAPI {
	// TODO 개발용, 배포용 설정
	static HOST = "http://localhost:8080";
	// static free = "/board/free/";
	static CATEGORY_LIST = this.HOST + "/category/free";
	static BOARD_LIST = this.HOST + "/board/free";
	static BOARD = this.BOARD_LIST + "/";
	static CHANGE_BOARD = this.BOARD_LIST;
	static NEW_REPLY = this.HOST + "/reply";
	static REPLY_LIST = this.REPLY_LIST + "/";
	static ATTACH_LIST = this.HOST + "/attach/";
	static ATTACH = this.ATTACH_LIST;
}
