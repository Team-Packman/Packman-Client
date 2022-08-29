import React, { UIEvent, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Layout from '../common/Layout';
import useGlobalState from '../../utils/hooks/useGlobalState';
import CheckListHeader from '../together/CheckListHeader';
import useAPI from '../../utils/hooks/useAPI';
import CheckListSubHeader from '../together/CheckListSubHeader';
import { packmanColors } from '../../styles/color';
import PackagesWithCategory from '../common/PackagesWithCategory';
import PackingItem, { UpdateItemPayload } from '../common/PackingItem';
import PackingCategory, { UpdateCategoryPayload } from '../common/PackingCategory';
import FunctionSection from '../common/FunctionSection';
import AddTemplateButton from '../common/AddTemplateButton';
import SharePackingListButton from '../common/SharePackingListButton';
import PackingListBottomModal from '../common/PackingListBottomModal';
import { useRouter } from 'next/router';
import ModalForAddToTemplate from '../common/ModalForAddToTemplate';
import ModalForShare from '../common/ModalForShare';

interface FocusInfo {
  type: 'category' | 'item';
  categoryId: string;
  packId: string;
  title: string;
}
interface RemainingInfoPayload {
  listId: string;
  title?: string;
  departureDate?: string;
  isSaved?: boolean;
  isAloned?: boolean;
}

type RemainingInfoType = 'title' | 'departure' | 'save';

function AloneLanding() {
  const client = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const initialFocus: FocusInfo = { type: 'category', categoryId: '', packId: '', title: '' };
  const [scroll, setScroll] = useGlobalState('scroll', false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(initialFocus);
  const [currentCreating, setCurrentCreating] = useState('');
  const [currentEditing, setCurrentEditing] = useState('');
  const [currentCreatingCategory, setCurrentCreatingCategory] = useState('');
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [addTemplateModalOpen, setAddTemplateModalOpen] = useState(false);
  const [shareTemplateModalOpen, setShareTemplateModalOpen] = useState(false);

  const getAlonePackingListDetail = useAPI(
    (api) => api.packingList.alone.getAlonePackingListDetail,
  );
  const { data } = useQuery(
    ['getAlonePackingListDetail', id],
    () => getAlonePackingListDetail(id as string),
    {
      enabled: !!id,
    },
  );

  const creatingHandler = (id: string) => setCurrentCreating(id);
  const createdHandler = () => setCurrentCreating('');
  const creatingCategoryHandler = () => setCurrentCreatingCategory(list.id);
  const createdCategoryHandler = () => setCurrentCreatingCategory('');

  const addAlonePackingListCategory = useAPI(
    (api) => api.packingList.alone.addAlonePackingListCategory,
  );
  const addAlonePackingListItem = useAPI((api) => api.packingList.alone.addAlonePackingListItem);
  const updateAlonePackingListCategory = useAPI(
    (api) => api.packingList.alone.updateAlonePackingListCategory,
  );
  const updateAlonePackingListItem = useAPI(
    (api) => api.packingList.alone.updateAlonePackingListItem,
  );
  const updatePackingListTitle = useAPI((api) => api.packingList.together.updatePackingListTitle);
  const updatePackingListDate = useAPI((api) => api.packingList.together.updatePackingListDate);
  const updatePackingListIsSaved = useAPI(
    (api) => api.packingList.together.updatePackingListIsSaved,
  );
  const deleteAlonePackingListCategory = useAPI(
    (api) => api.packingList.alone.deleteAlonePackingListCategory,
  );
  const deleteAlonePackingListItem = useAPI(
    (api) => api.packingList.alone.deleteAlonePackingListItem,
  );

  const { mutate: addAloneCategory } = useMutation(
    'addAlonePackingListCategory',
    addAlonePackingListCategory,
  );
  const { mutate: addAloneItem } = useMutation('addAlonePackingListItem', addAlonePackingListItem);
  const { mutate: patchAloneCategory } = useMutation(
    'updateAlonePackingListCategory',
    updateAlonePackingListCategory,
  );
  const { mutate: patchAloneItem } = useMutation(
    'updateAlonePackingListItem',
    updateAlonePackingListItem,
  );
  const { mutate: patchTitle } = useMutation('updatePackingListTitle', updatePackingListTitle);
  const { mutate: patchDate } = useMutation('updatePackingListDate', updatePackingListDate);
  const { mutate: patchIsSaved } = useMutation(
    'updatePackingListIsSaved',
    updatePackingListIsSaved,
  );
  const { mutate: deleteAloneCategory } = useMutation(
    'deleteAlonePackingListCategory',
    deleteAlonePackingListCategory,
  );
  const { mutate: deleteAloneItem } = useMutation(
    'deleteAlonePackingListItem',
    deleteAlonePackingListItem,
  );
  if (!data) return null;
  const { data: list } = data;
  const addTemplateModalOpenHandler = () => setAddTemplateModalOpen(true);
  const addTemplateModalCloseHandler = () => setAddTemplateModalOpen(false);
  const shareTemplateModalOpenHandler = () => setShareTemplateModalOpen(true);
  const shareTemplateModalCloseHandler = () => setShareTemplateModalOpen(false);
  const bottomModalOpenHandler = (payload: FocusInfo) => {
    if (!currentEditing) {
      setCurrentFocus(payload);
      setBottomModalOpen(true);
    }
  };
  const bottomModalCloseHandler = () => {
    setCurrentFocus(initialFocus);
    setBottomModalOpen(false);
  };

  const updateRemainingInfo = (payload: RemainingInfoPayload, type: RemainingInfoType) => {
    const { listId, title = '', departureDate = '', isSaved = false, isAloned = true } = payload;

    switch (type) {
      case 'title':
        patchTitle(
          {
            id: listId,
            title,
            isAloned,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getAlonePackingListDetail');
            },
          },
        );
        return;
      case 'departure':
        patchDate(
          {
            id: listId,
            departureDate,
            isAloned,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getAlonePackingListDetail');
            },
          },
        );
        return;
      case 'save':
        patchIsSaved(
          {
            id: listId,
            isSaved,
            isAloned,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getAlonePackingListDetail');
              addTemplateModalOpenHandler();
            },
          },
        );
        return;
    }
  };
  const updateCategory = (payload: UpdateCategoryPayload) => {
    const { name, categoryId, listId } = payload;
    if (currentEditing) {
      patchAloneCategory(
        {
          id: categoryId,
          listId,
          name,
        },
        {
          onSuccess: () => {
            client.invalidateQueries('getAlonePackingListDetail');
            bottomModalCloseHandler();
          },
        },
      );
    } else if (currentCreatingCategory) {
      if (name.length !== 0) {
        addAloneCategory(
          {
            listId,
            name,
          },
          {
            onSuccess: () => client.invalidateQueries('getAlonePackingListDetail'),
          },
        );
      }
    }

    setCurrentEditing('');
    createdCategoryHandler();
    bottomModalCloseHandler();
  };

  const updateItem = (payload: UpdateItemPayload) => {
    const { name, listId, packId, categoryId, isChecked } = payload;

    if (currentEditing) {
      if (name !== '') {
        patchAloneItem(
          {
            id: packId,
            name,
            listId,
            isChecked,
            categoryId,
          },
          {
            onSuccess: () => client.invalidateQueries('getAlonePackingListDetail'),
          },
        );
      }
    } else if (currentCreating) {
      if (name.length !== 0) {
        addAloneItem(
          {
            name,
            listId,
            categoryId,
          },
          {
            onSuccess: () => client.invalidateQueries('getAlonePackingListDetail'),
          },
        );
      }
    } else {
      patchAloneItem(
        {
          id: packId,
          name,
          listId,
          isChecked,
          categoryId,
        },
        {
          onSuccess: () => client.invalidateQueries('getAlonePackingListDetail'),
        },
      );
    }

    setCurrentEditing('');
    createdHandler();
    bottomModalCloseHandler();
  };

  const onEdit = () => {
    switch (currentFocus.type) {
      case 'category': {
        setCurrentEditing(currentFocus.categoryId);
        return;
      }
      case 'item': {
        setCurrentEditing(currentFocus.packId);
        return;
      }
    }
  };

  const onDelete = () => {
    switch (currentFocus.type) {
      case 'category': {
        deleteAloneCategory(
          {
            listId: list.id,
            categoryId: currentFocus.categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getAlonePackingListDetail');
            },
          },
        );

        return;
      }
      case 'item': {
        deleteAloneItem(
          {
            listId: list.id,
            categoryId: currentFocus.categoryId,
            packId: currentFocus.packId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getAlonePackingListDetail');
            },
          },
        );

        return;
      }
    }
  };

  const ScrollEvent = (e: UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop < 10) {
      scroll && setScroll(false);
    } else if (!isScrolling) {
      setIsScrolling(true);
      !scroll && setScroll(true);
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  return (
    <Layout
      back
      title="템플릿 미리보기"
      option={
        <CheckListHeader
          listId={list.id}
          departureDate={list.departureDate}
          title={list.title}
          updateRemainingInfo={updateRemainingInfo}
        />
      }
    >
      <StyledAloneLanding>
        <CheckListSubHeader categoryHandler={creatingCategoryHandler} />
        <StyledBody onScroll={ScrollEvent}>
          {list.category.map(({ id: categoryId, name, pack }) => (
            <PackagesWithCategory
              key={categoryId}
              packages={
                <>
                  {pack.map(({ id: packId, name, isChecked }) => (
                    <PackingItem
                      key={packId}
                      listId={list.id}
                      categoryId={categoryId}
                      packId={packId}
                      name={name}
                      isChecked={isChecked}
                      modalHandler={() =>
                        bottomModalOpenHandler({
                          ...initialFocus,
                          type: 'item',
                          packId,
                          categoryId,
                          title: name,
                        })
                      }
                      isEditing={currentEditing === packId}
                      updateItem={updateItem}
                    />
                  ))}
                </>
              }
              isCreating={currentCreating === categoryId}
              createHandler={() => creatingHandler(categoryId)}
              creating={
                <PackingItem
                  listId={list.id}
                  categoryId={categoryId}
                  packId={'creating'}
                  name={''}
                  isChecked={false}
                  isEditing={true}
                  updateItem={updateItem}
                />
              }
            >
              <PackingCategory
                categoryId={categoryId}
                listId={list.id}
                name={name}
                updateCategory={updateCategory}
                modalHandler={() =>
                  bottomModalOpenHandler({
                    ...initialFocus,
                    type: 'category',
                    categoryId,
                    title: name,
                  })
                }
                isEditing={currentEditing === categoryId}
              />
            </PackagesWithCategory>
          ))}
          {currentCreatingCategory === list.id && (
            <PackagesWithCategory>
              <PackingCategory
                categoryId={'creating'}
                listId={list.id}
                name={''}
                updateCategory={updateCategory}
                isEditing={true}
              />
            </PackagesWithCategory>
          )}
        </StyledBody>
        <FunctionSection>
          <AddTemplateButton
            onClick={() => updateRemainingInfo({ listId: list.id, isSaved: list.isSaved }, 'save')}
          >
            나만의 템플릿으로 추가
          </AddTemplateButton>
          <SharePackingListButton icon onClick={shareTemplateModalOpenHandler}>
            패킹 리스트 공유
          </SharePackingListButton>
        </FunctionSection>
      </StyledAloneLanding>
      {bottomModalOpen && (
        <PackingListBottomModal
          onEdit={onEdit}
          onDelete={onDelete}
          closeModal={bottomModalCloseHandler}
          content={currentFocus.title}
        />
      )}
      {addTemplateModalOpen && (
        <ModalForAddToTemplate title={list.title} onClick={addTemplateModalCloseHandler} />
      )}
      {shareTemplateModalOpen && <ModalForShare onClick={shareTemplateModalCloseHandler} />}
    </Layout>
  );
}

export default AloneLanding;

const StyledAloneLanding = styled.div`
  height: 100%;
  background-color: ${packmanColors.pmWhite};
  overflow: hidden;
`;

const StyledBody = styled.div`
  display: flex;
  //100% - subheader - device
  height: calc(100% - 4rem - 10rem);
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  margin-bottom: 24.4rem;
  padding: 0 2rem;
  padding-top: 1.6rem;
`;
