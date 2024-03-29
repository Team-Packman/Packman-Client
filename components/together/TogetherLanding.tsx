import React, { useState } from 'react';
import produce from 'immer';
import Layout from '../common/Layout';
import styled from 'styled-components';
import useAPI from '../../utils/hooks/useAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PackagesWithCategory from '../common/PackagesWithCategory';
import PackingCategory, { UpdateCategoryPayload } from '../common/PackingCategory';
import CheckListHeader from './CheckListHeader';
import { Pagination, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CheckListSubHeader from './CheckListSubHeader';
import PackingItem, { UpdateItemPayload } from '../common/PackingItem';
import { packmanColors } from '../../styles/color';
import Packer from '../common/Packer';
import { PackerInfoPayload } from './PackerModal';
import FunctionSection from '../common/FunctionSection';
import AddTemplateButton from '../common/AddTemplateButton';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { listState } from '../../utils/recoil/atom/atom';
import Loading from '../common/Loading';
import 'swiper/css';
import 'swiper/css/bundle';
import useHide from '../../utils/hooks/useHide';
import { GetTogetherPackingListBodyOutput } from '../../service/packingList/together';
import { AxiosError } from 'axios';
import useDynamic from '../../utils/hooks/useDynamic';
import AddToTemplateModal from './AddToTemplateModal';

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

function TogetherLanding() {
  const client = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const { isFresh } = useRecoilValue(listState);

  const initialFocus: FocusInfo = { type: 'category', categoryId: '', packId: '', title: '' };

  const PackerModal = useDynamic(() => import('./PackerModal'));
  const ModalForInvitation = useDynamic(() => import('../common/ModalForInvitation'));
  const PackingListBottomModal = useDynamic(() => import('../common/PackingListBottomModal'));
  // const ModalForAddToTemplate = useDynamic(() => import('../common/ModalForAddToTemplate'));

  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [packerModalOpen, setPackerModalOpen] = useState(false);
  const [addTemplateModalOpen, setAddTemplateModalOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(0);
  const [selectedPacker, setSelectedPacker] = useState<{ id: string; nickname: string } | null>(
    null,
  );

  const [currentCreatingCategory, setCurrentCreatingCategory] = useState('');
  const [currentCreating, setCurrentCreating] = useState('');
  const [currentEditing, setCurrentEditing] = useState('');
  const [currentFocus, setCurrentFocus] = useState(initialFocus);

  const [{ sectionArr }, _, scrollEvent] = useHide(activeMode);

  /////////////////// api /////////////////////
  const getPackingListBody = useAPI((api) => api.packingList.together.getPackingListBody);
  const getPackingListHeader = useAPI((api) => api.packingList.together.getPackingListHeader);
  const getMembers = useAPI((api) => api.packingList.together.getMembers);
  const addPackingListCategory = useAPI((api) => api.packingList.together.addPackingListCategory);
  const addAlonePackingListCategory = useAPI(
    (api) => api.packingList.alone.addAlonePackingListCategory,
  );
  const addPackingListItem = useAPI((api) => api.packingList.together.addPackingListItem);
  const addAlonePackingListItem = useAPI((api) => api.packingList.alone.addAlonePackingListItem);
  const updatePackingListCategory = useAPI(
    (api) => api.packingList.together.updatePackingListCategory,
  );
  const updateAlonePackingListCategory = useAPI(
    (api) => api.packingList.alone.updateAlonePackingListCategory,
  );
  const updatePackingListItem = useAPI((api) => api.packingList.together.updatePackingListItem);
  const updateAlonePackingListItem = useAPI(
    (api) => api.packingList.alone.updateAlonePackingListItem,
  );
  const updatePackingListTitle = useAPI((api) => api.packingList.together.updatePackingListTitle);
  const updatePackingListDate = useAPI((api) => api.packingList.together.updatePackingListDate);
  const updatePackingListIsSaved = useAPI(
    (api) => api.packingList.together.updatePackingListIsSaved,
  );
  const updatePackingListPacker = useAPI((api) => api.packingList.together.updatePackingListPacker);
  const deletePackingListCategory = useAPI(
    (api) => api.packingList.together.deletePackingListCategory,
  );
  const deleteAlonePackingListCategory = useAPI(
    (api) => api.packingList.alone.deleteAlonePackingListCategory,
  );
  const deletePackingListItem = useAPI((api) => api.packingList.together.deletePackingListItem);
  const deleteAlonePackingListItem = useAPI(
    (api) => api.packingList.alone.deleteAlonePackingListItem,
  );

  const { data: packingListHeader } = useQuery(
    ['getPackingListHeader', id],
    () => getPackingListHeader(id as string, false),
    {
      refetchInterval: 3000,
      enabled: !!id,
    },
  );

  const { data: packingListBody } = useQuery(
    ['getPackingListBody', id],
    () => getPackingListBody(id as string),
    {
      refetchInterval: 3000,
      enabled: !!id,
    },
  );

  const { data: packingListMembers } = useQuery(
    ['getMembers', id],
    () => getMembers(id as string),
    {
      refetchInterval: 3000,
      enabled: !!id,
    },
  );

  const { mutate: addCategory } = useMutation('addPackingListCategory', addPackingListCategory, {
    onMutate: async (newCategory) => {
      const prev = client.getQueryData<GetTogetherPackingListBodyOutput>([
        'getPackingListBody',
        id,
      ]);
      const newPrev = produce(prev, (draft) => {
        draft?.data.togetherPackingList.category.map((category) => {
          if (category.id === newCategory.id) {
            category.name = newCategory.name;
          }
          return category;
        });
      });
      client.setQueryData(['getPackingListBody', id], newPrev);
      return { prev };
    },
  });
  const { mutate: addAloneCategory } = useMutation(
    'addAlonePackingListCategory',
    addAlonePackingListCategory,
    {
      onMutate: async (newCategory) => {
        const prev = client.getQueryData<GetTogetherPackingListBodyOutput>([
          'getPackingListBody',
          id,
        ]);
        const newPrev = produce(prev, (draft) => {
          draft?.data.togetherPackingList.category.map((category) => {
            if (category.id === newCategory.id) {
              category.name = newCategory.name;
            }
            return category;
          });
        });
        client.setQueryData(['getPackingListBody', id], newPrev);
        return { prev };
      },
    },
  );
  const { mutate: addItem } = useMutation('addPackingListItem', addPackingListItem);
  const { mutate: addAloneItem } = useMutation('addAlonePackingListItem', addAlonePackingListItem);
  const { mutate: patchCategory } = useMutation(
    'updatePackingListCategory',
    updatePackingListCategory,
    {
      onMutate: async (newCategory) => {
        const prev = client.getQueryData<GetTogetherPackingListBodyOutput>([
          'getPackingListBody',
          id,
        ]);

        const newPrev = produce(prev, (draft) => {
          draft?.data.togetherPackingList.category.map((category) => {
            if (category.id === newCategory.id) {
              category.name = newCategory.name;
            }

            return category;
          });
        });

        client.setQueryData(['getPackingListBody', id], newPrev);

        return { prev };
      },
    },
  );
  const { mutate: patchAloneCategory } = useMutation(
    'updateAlonePackingListCategory',
    updateAlonePackingListCategory,
    {
      onMutate: async (newCategory) => {
        const prev = client.getQueryData<GetTogetherPackingListBodyOutput>([
          'getPackingListBody',
          id,
        ]);

        const newPrev = produce(prev, (draft) => {
          draft?.data.myPackingList.category.map((category) => {
            if (category.id === newCategory.id) {
              category.name = newCategory.name;
            }

            return category;
          });
        });

        client.setQueryData(['getPackingListBody', id], newPrev);

        return { prev };
      },
    },
  );
  const { mutate: patchItem } = useMutation('updatePackingListItem', updatePackingListItem);
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
  const { mutate: patchPacker } = useMutation('updatePackingListPacker', updatePackingListPacker);
  const { mutate: deleteCategory } = useMutation(
    'deletePackingListCategory',
    deletePackingListCategory,
  );
  const { mutate: deleteAloneCategory } = useMutation(
    'deleteAlonePackingListCategory',
    deleteAlonePackingListCategory,
  );
  const { mutate: deleteItem } = useMutation('deletePackingListItem', deletePackingListItem);
  const { mutate: deleteAloneItem } = useMutation(
    'deleteAlonePackingListItem',
    deleteAlonePackingListItem,
  );
  ////////////////////////////////////////////

  if (!packingListBody || !packingListHeader || !packingListMembers) return <Loading />;
  const { data: info } = packingListBody;
  const { data: header } = packingListHeader;
  const { data: members } = packingListMembers;

  const packingRole = [info.togetherPackingList, info.myPackingList];
  const modeHandler = (idx: number) => setActiveMode(idx);
  const creatingItemHandler = (categoryId: string) => setCurrentCreating(categoryId);
  const createdItemHandler = () => setCurrentCreating('');
  const creatingCategoryHandler = () => setCurrentCreatingCategory(packingRole[activeMode].id);
  const createdCategoryHandler = () => setCurrentCreatingCategory('');
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
  const packerModalOpenHandler = (
    packId: string,
    packer: {
      id: string;
      nickname: string;
    } | null,
  ) => {
    setSelectedPacker(packer);
    setCurrentFocus({ ...initialFocus, type: 'item', packId });
    setPackerModalOpen(true);
  };
  const packerModalCloseHandler = () => {
    setCurrentFocus(initialFocus);
    setPackerModalOpen(false);
  };

  const addTemplateModalOpenHandler = () => setAddTemplateModalOpen(true);
  const addTemplateModalCloseHandler = () => setAddTemplateModalOpen(false);

  const updateCategory = (payload: UpdateCategoryPayload) => {
    const { name, categoryId, listId } = payload;
    if (currentEditing) {
      if (!activeMode) {
        patchCategory(
          {
            id: categoryId,
            name,
            listId,
          },
          {
            onError: (err, variable, context) => {
              if (context?.prev) {
                client.setQueryData(['getPackingListBody', id], context.prev);
                if (err instanceof AxiosError) {
                  alert(err.response?.data.message);
                }
              }
            },
            onSettled: () => {
              client.invalidateQueries(['getPackingListBody', id]);
            },
          },
        );
      } else {
        patchAloneCategory(
          {
            id: categoryId,
            name,
            listId,
          },
          {
            onError: (err, variable, context) => {
              if (context?.prev) {
                client.setQueryData(['getPackingListBody', id], context.prev);
                if (err instanceof AxiosError) {
                  alert(err.response?.data.message);
                }
              }
            },
            onSettled: () => {
              client.invalidateQueries(['getPackingListBody', id]);
            },
          },
        );
      }
    } else if (currentCreatingCategory && name.length !== 0) {
      if (!activeMode) {
        addCategory(
          {
            id: categoryId,
            name,
            listId,
          },
          {
            onError: (err, variable, context) => {
              if (context?.prev) {
                client.setQueryData(['getPackingListBody', id], context.prev);
                if (err instanceof AxiosError) {
                  alert(err.response?.data.message);
                }
              }
            },
            onSettled: () => {
              client.invalidateQueries(['getPackingListBody', id]);
            },
          },
        );
      } else {
        addAloneCategory(
          {
            id: categoryId,
            name,
            listId,
          },
          {
            onError: (err, variable, context) => {
              if (context?.prev) {
                client.setQueryData(['getPackingListBody', id], context.prev);
                if (err instanceof AxiosError) {
                  alert(err.response?.data.message);
                }
              }
            },
            onSettled: () => {
              client.invalidateQueries(['getPackingListBody', id]);
            },
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
      if (!activeMode) {
        patchItem(
          {
            name,
            listId,
            isChecked,
            id: packId,
            categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries(['getPackingListBody', id]);
            },
          },
        );
      } else {
        patchAloneItem(
          {
            name,
            listId,
            isChecked,
            id: packId,
            categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries(['getPackingListBody', id]);
            },
          },
        );
      }
    } else if (currentCreating) {
      if (name.length !== 0) {
        if (!activeMode) {
          addItem(
            {
              name,
              listId,
              categoryId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries(['getPackingListBody', id]);
              },
            },
          );
        } else {
          addAloneItem(
            {
              name,
              listId,
              categoryId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries(['getPackingListBody', id]);
              },
            },
          );
        }
      }
    } else {
      if (!activeMode) {
        patchItem(
          {
            name,
            listId,
            isChecked,
            id: packId,
            categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries(['getPackingListBody', id]);
            },
          },
        );
      } else {
        patchAloneItem(
          {
            name,
            listId,
            isChecked,
            id: packId,
            categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries(['getPackingListBody', id]);
            },
          },
        );
      }
    }
    setCurrentEditing('');
    createdItemHandler();
    bottomModalCloseHandler();
  };
  const updatePacker = (payload: PackerInfoPayload) => {
    patchPacker(payload, {
      onSuccess: () => {
        client.invalidateQueries(['getPackingListBody', id]);
      },
    });
  };
  const updateRemainingInfo = (payload: RemainingInfoPayload, type: RemainingInfoType) => {
    const { listId, title = '', departureDate = '', isSaved = false, isAloned = false } = payload;

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
              client.invalidateQueries(['getPackingListBody', id]);
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
              client.invalidateQueries(['getPackingListBody', id]);
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
              client.invalidateQueries(['getPackingListBody', id]);
              addTemplateModalOpenHandler();
            },
          },
        );
        return;
    }
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
        if (!activeMode) {
          deleteCategory(
            {
              listId: packingRole[activeMode].id,
              categoryId: currentFocus.categoryId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries(['getPackingListBody', id]);
              },
            },
          );
        } else {
          deleteAloneCategory(
            {
              listId: packingRole[activeMode].id,
              categoryId: currentFocus.categoryId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries(['getPackingListBody', id]);
              },
            },
          );
        }

        return;
      }
      case 'item': {
        if (!activeMode) {
          deleteItem(
            {
              listId: packingRole[activeMode].id,
              categoryId: currentFocus.categoryId,
              packId: currentFocus.packId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries(['getPackingListBody', id]);
              },
            },
          );
        } else {
          deleteAloneItem(
            {
              listId: packingRole[activeMode].id,
              categoryId: currentFocus.categoryId,
              packId: currentFocus.packId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries(['getPackingListBody', id]);
              },
            },
          );
        }

        return;
      }
    }
  };

  return (
    <Layout
      back
      title="패킹리스트"
      icon="member"
      listId={info.id}
      folderId={info.folderId}
      option={
        <CheckListHeader
          together
          listId={info.id}
          departureDate={header.departureDate}
          title={header.title}
          activeMode={activeMode}
          updateRemainingInfo={updateRemainingInfo}
        />
      }
    >
      <StyledTogetherLanding>
        <Swiper
          modules={[Pagination, Virtual]}
          style={{ height: '100%' }}
          onSlideChange={(s) => setActiveMode(s.activeIndex)}
          virtual
        >
          <CheckListSubHeader
            together
            slot="container-start"
            activeMode={activeMode}
            modeHandler={modeHandler}
            categoryHandler={creatingCategoryHandler}
          />
          {packingRole.map((list, i) => {
            return (
              <SwiperSlide key={list.id} virtualIndex={i}>
                <StyledBody onScroll={scrollEvent} ref={sectionArr.current[i]}>
                  {list.category.map(({ id: categoryId, name, pack }) => (
                    <PackagesWithCategory
                      key={categoryId}
                      packages={
                        <>
                          {pack.map(({ id: packId, name, isChecked, packer }) => (
                            <PackingItem
                              key={packId}
                              listId={list.id}
                              categoryId={categoryId}
                              packId={packId}
                              name={name}
                              isChecked={isChecked}
                              mode={activeMode}
                              modalHandler={() =>
                                bottomModalOpenHandler({
                                  ...initialFocus,
                                  type: 'item',
                                  categoryId,
                                  packId,
                                  title: name,
                                })
                              }
                              isEditing={currentEditing === packId}
                              updateItem={updateItem}
                              assignee={
                                <Packer
                                  packer={packer}
                                  modalHandler={() => packerModalOpenHandler(packId, packer)}
                                />
                              }
                            />
                          ))}
                        </>
                      }
                      isCreating={currentCreating === categoryId}
                      createHandler={() => creatingItemHandler(categoryId)}
                      creating={
                        <PackingItem
                          listId={list.id}
                          categoryId={categoryId}
                          packId={'creating'}
                          name={''}
                          isChecked={false}
                          isEditing={true}
                          updateItem={updateItem}
                          mode={activeMode}
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
                  <StyledScrollBlock />
                </StyledBody>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <FunctionSection>
          <AddTemplateButton
            onClick={() =>
              updateRemainingInfo({ listId: info.id, isSaved: info.myPackingList.isSaved }, 'save')
            }
          >
            {info.myPackingList.isSaved ? '나만의 템플릿 업데이트' : '나만의 템플릿으로 추가'}
          </AddTemplateButton>
        </FunctionSection>
      </StyledTogetherLanding>

      {packerModalOpen && (
        <PackerModal
          members={members.member}
          modalHandler={packerModalCloseHandler}
          packId={currentFocus.packId}
          listId={info.togetherPackingList.id}
          updatePacker={updatePacker}
          selectedPacker={selectedPacker}
        />
      )}
      {isFresh && <ModalForInvitation inviteCode={info.togetherPackingList.inviteCode} />}

      {bottomModalOpen && (
        <PackingListBottomModal
          onEdit={onEdit}
          onDelete={onDelete}
          closeModal={bottomModalCloseHandler}
          content={currentFocus.title}
        />
      )}
      {addTemplateModalOpen && (
        <AddToTemplateModal title={header.title} onClick={addTemplateModalCloseHandler} />
      )}
    </Layout>
  );
}

export default TogetherLanding;

const StyledTogetherLanding = styled.div`
  height: 100%;
  background-color: ${packmanColors.pmWhite};
  overflow: hidden;
`;

const StyledBody = styled.div`
  //100% - subheader - function section
  max-height: calc(100% - 11rem - 8rem);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  overflow-y: scroll;

  padding: 0 2rem;
  padding-top: 1.6rem;
`;
const StyledScrollBlock = styled.div`
  width: 100%;
  background-color: transparent;
`;
