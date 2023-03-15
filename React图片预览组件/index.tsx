import React, { useContext, useEffect, useState } from 'react';
import './AttachmentsDisplay.scss';
import { Card, Tooltip, Modal, Progress, message } from 'antd';

interface AttachmentsDisplayProps {
	cardId: string;
}

function setUrl(url: string) {
	if (url.startsWith('https://')) {
		return url;
	} else {
		return 'https://'.concat(url);
	}
}

interface FileListType {
	resourceId: string;
	url: string;
	title: string;
	updatedAt: string;
	type: string;
	id: string;
}

const AttachmentsDisplay: React.FC<AttachmentsDisplayProps> = (props) => {
	const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
	const [imagePreviewList, setImagePreviewList] = useState<FileListType[]>([]);
	const [previewIndex, setPreviewIndex] = useState(0);

	const openImagePreview = (id: string) => {
    const fileList = [];
		const list = fileList.filter(
			(item) =>
				item.type == '0' &&
				['png', 'jpg', 'jpeg'].includes(item.url.split('.').pop() as string)
		);
		const index = list.findIndex((item) => item.id === id);
		setPreviewIndex(index);
		setImagePreviewList(list);
		setIsImagePreviewOpen(true);
	};

	return (
		<div>
			<ImagePreview
				isImagePreviewOpen={isImagePreviewOpen}
				setIsImagePreviewOpen={setIsImagePreviewOpen}
				imagePreviewList={imagePreviewList}
				imagePreviewIndex={previewIndex}
				setImagePreviewIndex={setPreviewIndex}
			></ImagePreview>
		</div>
	);
};
export default AttachmentsDisplay;
