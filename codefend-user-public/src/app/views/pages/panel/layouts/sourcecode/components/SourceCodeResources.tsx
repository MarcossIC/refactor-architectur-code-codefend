import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { SourceCode, generateIDArray, useModal } from '../../../../../../data';
import {
	ConfirmModal,
	EmptyCard,
	ModalTitleWrapper,
	PageLoader,
	SourceCodeIcon,
	TrashIcon
} from '../../../../../components';
import '../../../../../styles/table.scss';
import { AddRepositoryModal } from '../../../../../components/modals/AddRepositoryModal';

interface SourceCodeProps {
	isLoading: boolean;
	sourceCode: SourceCode[];
	onDelete: (deleted: string) => void;
	update: (params: any) => void;
}

export const SourceCodeResources: React.FC<SourceCodeProps> = (props) => {
	const { showModal, showModalStr, setShowModal, setShowModalStr } =
		useModal();
	const [selectedSourceCodeIdToDelete, setSelectedSourceCodeIdToDelete] =
		useState<string>('');
	const [isDeletingSourceCode, setIsDeletingSourceCode] = useState(false);

	const handleDelete = useCallback(() => {
		setIsDeletingSourceCode(true);
		props.onDelete(selectedSourceCodeIdToDelete);
	}, []);

	const sourceKeys = useMemo(() => {
		return props.isLoading ? [] : generateIDArray(props.sourceCode.length);
	}, [props.sourceCode]);

	return (
		<>
			<ModalTitleWrapper
				close={() => setShowModal(false)}
				headerTitle="Delete source code"
				isActive={showModal && showModalStr === 'delete_resource'}>
				<ConfirmModal
					cancelText="Cancel"
					confirmText="Delete"
					header=""
					close={() => setShowModal(!showModal)}
					action={() => {
						props.onDelete(selectedSourceCodeIdToDelete);
						setShowModal(!showModal);
					}}
				/>
			</ModalTitleWrapper>

			<ModalTitleWrapper
				close={() => setShowModal(false)}
				headerTitle="Add repository"
				isActive={showModal && showModalStr === 'add_repository'}>
				<AddRepositoryModal
					onDone={(params: any) => {
						props.update(params);
						setShowModal(!showModal);
					}}
					close={() => setShowModal(!showModal)}
				/>
			</ModalTitleWrapper>
			<div className="card table">
				<div className="header">
					<div className="title">
						<div className="icon">
							<SourceCodeIcon />
						</div>
						<span>Source Code</span>
					</div>

					<div className="actions">
						<div
							onClick={() => {
								setShowModal(true);
								setShowModalStr('add_repository');
							}}>
							Add repository
						</div>
					</div>
				</div>
				<div className="columns-name">
					<div className="id">id</div>
					<div className="full-name">name</div>
					<div className="url">address</div>
					<div className="boolean">visibility</div>
					<div className="source-code">source code</div>
					<div className="id">actions</div>
				</div>

				{!props.isLoading ? (
					<div className="rows">
						{props.sourceCode.map((repository: any, index: number) => (
							<Fragment key={sourceKeys[index]}>
								<div className="item">
									<div className="id">{repository.id}</div>
									<div className="full-name">{repository.name}</div>
									<div className="url">{repository.accessLink}</div>
									<div className="boolean">{repository.isPublic}</div>
									<div className="source-code">
										{repository.sourceCode}
									</div>
									<div
										className=" id cursor-pointer p-3 flex"
										onClick={() => {
											setSelectedSourceCodeIdToDelete(repository.id);
											setShowModal(!showModal);
											setShowModalStr('delete_resource');
										}}>
										<TrashIcon />
									</div>
								</div>
							</Fragment>
						))}
					</div>
				) : (
					<>
						<PageLoader />
					</>
				)}
				{!props.isLoading && props.sourceCode.length === 0 ? (
					<>
						<EmptyCard />
					</>
				) : (
					<></>
				)}
			</div>
		</>
	);
};
