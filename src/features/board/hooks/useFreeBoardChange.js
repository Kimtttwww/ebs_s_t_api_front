import FreeBoardAPI from "@/entites/board/api/FreeBoardAPI";
import { useRef } from "react";

export default function useFreeBoardChange() {
	const boardRef = useRef({});
	const attachRef = useRef([]);

	return {boardRef, attachRef};
}