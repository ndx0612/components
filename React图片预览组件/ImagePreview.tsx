import React from 'react';
import { getCloudUpload } from '@Pages/BoardDetailPage/Card/CardDetail/AttachmentsDisplay/component/GetCloudUpload';
import './ImagePreview.scss';

interface ImagePreviewProps {
	isImagePreviewOpen: boolean;
	setIsImagePreviewOpen: (value: boolean) => void;
	imagePreviewList: FileListType[];
	imagePreviewIndex: number;
	setImagePreviewIndex: (value: number) => void;
}

interface FileListType {
	resourceId: string;
	url: string;
	title: string;
	updatedAt: string;
	type: string;
	id: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = (props) => {
	const [scale, setScale] = React.useState(1);

	return (
		<div
			className={`image-preview-box ${
				props.isImagePreviewOpen ? 'image-preview-show' : 'image-preview-hide'
			}`}
		>
			<div
				style={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<div
					style={{
						minHeight: '80px',
						width: '100%',
						background: '#181A1E',
						padding: '20px 48px',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div style={{ color: '#FFF' }}>
						<div
							style={{
								display: 'flex',
							}}
						>
							<div
								style={{
									background: '#3F8A46',
									height: '40px',
									width: '40px',
									borderRadius: '4px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<img src="/assets/icons/icon-white-copy.svg" alt="" />
							</div>
							<div
								style={{
									marginLeft: '16px',
								}}
							>
								<div>
									{props.imagePreviewList[props.imagePreviewIndex]?.title || ''}
								</div>
								<div>200k</div>
							</div>
						</div>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<img
							style={{ marginRight: '23px' }}
							src="/assets/icons/icon-white-download.svg"
						/>
						<img
							style={{ cursor: 'pointer' }}
							onClick={() => {
								props.setIsImagePreviewOpen(false);
							}}
							src="/assets/icons/icon-white-exit.svg"
						/>
					</div>
				</div>
				<div
					style={{
						overflow: 'auto',
						textAlign: 'center',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<img
						style={{ transform: `scale3d(${scale}, ${scale}, 1)` }}
						className="image-preview-img"
						src={
							getCloudUpload() +
								props.imagePreviewList[props.imagePreviewIndex]?.url || ''
						}
						alt=""
					/>
				</div>
				<div className="picture-preview-operation">
					<div></div>
					<div
						style={{
							width: '300px',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<img
								className={`${
									props.imagePreviewIndex === 0
										? 'picture-preview-operation-hide'
										: 'picture-preview-operation-show'
								}`}
								style={{ cursor: 'pointer' }}
								src="/assets/icons/icon-toggle-picture-left.svg"
								onClick={() => {
									props.setImagePreviewIndex(props.imagePreviewIndex - 1);
								}}
							/>
						</div>
						<div>
							<img
								style={{ cursor: 'pointer' }}
								className={`${
									scale.toFixed(2) === '2.00'
										? 'picture-preview-operation-hide'
										: 'picture-preview-operation-show'
								}`}
								src="/assets/icons/icon-picture-bigger.svg"
								onClick={() => {
									setScale(scale + 0.2);
								}}
							/>
						</div>
						<div>
							<img
								style={{ cursor: 'pointer' }}
								className={`${
									scale.toFixed(2) === '0.20'
										? 'picture-preview-operation-hide'
										: 'picture-preview-operation-show'
								}`}
								src="/assets/icons/icon-picture-smaller.svg"
								onClick={() => {
									setScale(scale - 0.2);
								}}
							/>
						</div>
						<div>
							<img
								className={`${
									props.imagePreviewIndex === props.imagePreviewList.length - 1
										? 'picture-preview-operation-hide'
										: 'picture-preview-operation-show'
								}`}
								style={{ cursor: 'pointer' }}
								src="/assets/icons/icon-toggle-picture-right.svg"
								onClick={() => {
									props.setImagePreviewIndex(props.imagePreviewIndex + 1);
								}}
							/>
						</div>
					</div>
					<div style={{ color: '#fff', width: '40px' }}>
						{(scale * 100).toFixed(0)}%
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImagePreview;
