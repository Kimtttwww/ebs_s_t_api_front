export default class ApiPath {
	// TODO 개발용, 배포용 설정
	static host = "http://localhost:8080";
	// static free = "/board/free/";
	static boardList = this.host + "/board/free";
	static categoryList = this.host + "/board/free/category";
	static view = this.host + "/board/free/";
	static newboard = this.host + "/board/free/write";
	static modify = this.host + "/board/free/modify?boardNo=";
	static attachList = this.host + "/board/attach?boardNo="
	static replyList = this.host + "/board/reply?boardNo="
	static newReply = this.host + "/board/reply?boardNo="
}