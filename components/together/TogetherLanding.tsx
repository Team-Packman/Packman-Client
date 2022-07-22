import React, { useState, UIEvent, useEffect } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import useAPI from '../../utils/hooks/useAPI';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import PackagesWithCategory from '../common/PackagesWithCategory';
import PackingCategory, { UpdateCategoryPayload } from '../common/PackingCategory';
import CheckListHeader from './CheckListHeader';
import { Pagination, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import CheckListSubHeader from './CheckListSubHeader';
import PackingItem, { UpdateItemPayload } from '../common/PackingItem';
import useGlobalState from '../../utils/hooks/useGlobalState';
import { packmanColors } from '../../styles/color';
import Packer from '../common/Packer';
import PackerModal, { PackerInfoPayload } from './PackerModal';
import BottomModal from '../common/BottomModal';
import FunctionSection from '../common/FunctionSection';
import AddTemplateButton from '../common/AddTemplateButton';
import { useRouter } from 'next/router';
import ModalForInvitation from '../common/ModalForInvitation';
import ModalForInvited from '../common/ModalForInvited';
import useCache from '../../utils/hooks/useCache';
import { User } from '../../type/globalState';

interface FocusInfo {
  type: 'category' | 'item';
  categoryId: string;
  packId: string;
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
  const { id, invite } = router.query;
  const [user, isLoaded] = useCache<User>('User');
  const [globalUser] = useGlobalState<User>('User');
  console.log('user', user);
  console.log('globalUser', globalUser);
  const initialFocus: FocusInfo = { type: 'category', categoryId: '', packId: '' };
  const [scroll, setScroll] = useGlobalState('scroll', false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [packerModalOpen, setPackerModalOpen] = useState(false);
  const [invitationModalOpen, setInvitationModalOpen] = useState(false);
  const [invitedModalOpen, setInvitedModalOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(0);
  //category, item 끼리 서로 id 중복 X?
  const [currentCreatingCategory, setCurrentCreatingCategory] = useState('');
  const [currentCreating, setCurrentCreating] = useState('');
  const [currentEditing, setCurrentEditing] = useState('');
  const [currentFocus, setCurrentFocus] = useState(initialFocus);

  /////////////////// api /////////////////////
  const getPackingListDeatil = useAPI((api) => api.packingList.together.getPackingListDeatil);
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
  const { data: packingListData } = useQuery(
    ['getPackingListDeatil', id],
    () => getPackingListDeatil(id as string),
    {
      refetchInterval: 3000,
      enabled: !!id,
    },
  );
  const { mutate: addCategory } = useMutation('addPackingListCategory', addPackingListCategory);
  const { mutate: addAloneCategory } = useMutation(
    'addAlonePackingListCategory',
    addAlonePackingListCategory,
  );
  const { mutate: addItem } = useMutation('addPackingListItem', addPackingListItem);
  const { mutate: addAloneItem } = useMutation('addAlonePackingListItem', addAlonePackingListItem);
  const { mutate: patchCategory } = useMutation(
    'updatePackingListCategory',
    updatePackingListCategory,
  );
  const { mutate: patchAloneCategory } = useMutation(
    'updateAlonePackingListCategory',
    updateAlonePackingListCategory,
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

  useEffect(() => {
    if (router.isReady) {
      if (!invite) {
        setInvitationModalOpen(true);
        // invitationModalOpenHandler();
        console.log('!invite');
      } else if (isLoaded) {
        console.log('is loadied');
        if (user && user.isAlreadyUser) {
          console.log('zzzxxx');
          console.log(user);
          // invitedModalCloseHandler();
          setInvitedModalOpen(false);
        } else {
          // router.push('/login');
        }
        //유저가 있으면 모달 x
        //없으면 모달 띄우기
      }
    }
  }, [router.isReady, user]);

  if (!user || !globalUser) return <div>user loading........</div>;
  //   return <ModalForInvited title={router.query.title as string} />;
  if (!packingListData) return <div>data loading.......</div>;
  const { data: info } = packingListData;
  const packingRole = [info.togetherPackingList, info.myPackingList];
  const modeHandler = (idx: number) => setActiveMode(idx);
  const creatingItemHandler = (categoryId: string) => setCurrentCreating(categoryId);
  const createdItemHandler = () => setCurrentCreating('');
  const creatingCategoryHandler = () => setCurrentCreatingCategory(packingRole[activeMode]._id);
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
  const packerModalOpenHandler = (packId: string) => {
    setCurrentFocus({ ...initialFocus, type: 'item', packId });
    setPackerModalOpen(true);
  };
  const packerModalCloseHandler = () => {
    setCurrentFocus(initialFocus);
    setPackerModalOpen(false);
  };
  const invitationModalOpenHandler = () => setInvitationModalOpen(true);
  const invitationModalCloseHandler = () => setInvitationModalOpen(false);

  const updateCategory = (payload: UpdateCategoryPayload) => {
    const { name, categoryId, listId } = payload;
    if (currentEditing) {
      if (!activeMode) {
        patchCategory(
          {
            _id: categoryId,
            name,
            listId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
            },
          },
        );
      } else {
        patchAloneCategory(
          {
            _id: categoryId,
            name,
            listId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
            },
          },
        );
      }
    } else if (currentCreatingCategory && name.length !== 0) {
      if (!activeMode) {
        addCategory(
          {
            name,
            listId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
            },
          },
        );
      } else {
        addAloneCategory(
          {
            name,
            listId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
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
            _id: packId,
            categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
            },
          },
        );
      } else {
        patchAloneItem(
          {
            name,
            listId,
            isChecked,
            _id: packId,
            categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
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
                client.invalidateQueries('getPackingListDeatil');
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
                client.invalidateQueries('getPackingListDeatil');
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
            _id: packId,
            categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
            },
          },
        );
      } else {
        patchAloneItem(
          {
            name,
            listId,
            isChecked,
            _id: packId,
            categoryId,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
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
        client.invalidateQueries('getPackingListDeatil');
      },
    });
  };
  const updateRemainingInfo = (payload: RemainingInfoPayload, type: RemainingInfoType) => {
    const { listId, title = '', departureDate = '', isSaved = false, isAloned = false } = payload;

    switch (type) {
      case 'title':
        patchTitle(
          {
            _id: listId,
            title,
            isAloned,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
            },
          },
        );
        return;
      case 'departure':
        patchDate(
          {
            _id: listId,
            departureDate,
            isAloned,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
            },
          },
        );
        return;
      case 'save':
        patchIsSaved(
          {
            _id: listId,
            isSaved,
            isAloned,
          },
          {
            onSuccess: () => {
              client.invalidateQueries('getPackingListDeatil');
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
              listId: packingRole[activeMode]._id,
              categoryId: currentFocus.categoryId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries('getPackingListDeatil');
              },
            },
          );
        } else {
          deleteAloneCategory(
            {
              listId: packingRole[activeMode]._id,
              categoryId: currentFocus.categoryId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries('getPackingListDeatil');
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
              listId: packingRole[activeMode]._id,
              categoryId: currentFocus.categoryId,
              packId: currentFocus.packId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries('getPackingListDeatil');
              },
            },
          );
        } else {
          deleteAloneItem(
            {
              listId: packingRole[activeMode]._id,
              categoryId: currentFocus.categoryId,
              packId: currentFocus.packId,
            },
            {
              onSuccess: () => {
                client.invalidateQueries('getPackingListDeatil');
              },
            },
          );
        }

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
          together
          listId={info.togetherPackingList._id}
          departureDate={info.departureDate}
          title={info.title}
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
              <SwiperSlide key={list._id} virtualIndex={i}>
                <StyledBody onScroll={ScrollEvent}>
                  {list.category.map(({ _id: categoryId, name, pack }) => (
                    <PackagesWithCategory
                      key={categoryId}
                      packages={
                        <>
                          {pack.map(({ _id: packId, name, isChecked, packer }) => (
                            <PackingItem
                              key={packId}
                              listId={list._id}
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
                                })
                              }
                              isEditing={currentEditing === packId}
                              updateItem={updateItem}
                              assginee={
                                <Packer
                                  packer={packer}
                                  modalHandler={() => packerModalOpenHandler(packId)}
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
                          listId={list._id}
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
                        listId={list._id}
                        name={name}
                        updateCategory={updateCategory}
                        modalHandler={() =>
                          bottomModalOpenHandler({
                            ...initialFocus,
                            type: 'category',
                            categoryId,
                          })
                        }
                        isEditing={currentEditing === categoryId}
                      />
                    </PackagesWithCategory>
                  ))}
                  {currentCreatingCategory === list._id && (
                    <PackagesWithCategory>
                      <PackingCategory
                        categoryId={'creating'}
                        listId={list._id}
                        name={''}
                        updateCategory={updateCategory}
                        isEditing={true}
                      />
                    </PackagesWithCategory>
                  )}
                </StyledBody>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <FunctionSection>
          <AddTemplateButton
            onClick={() =>
              updateRemainingInfo({ listId: info.togetherPackingList._id, isSaved: true }, 'save')
            }
          >
            나만의 템플릿으로 추가
          </AddTemplateButton>
        </FunctionSection>
      </StyledTogetherLanding>
      {bottomModalOpen && (
        <StyledBg onClick={bottomModalCloseHandler}>
          <StyledModal>
            <button onClick={onEdit} style={{ width: '8rem', height: '8rem' }}>
              update
            </button>
            <button onClick={onDelete} style={{ width: '8rem', height: '8rem' }}>
              delete
            </button>
          </StyledModal>
        </StyledBg>
      )}
      {packerModalOpen && (
        <PackerModal
          members={info.group.members}
          modalHandler={packerModalCloseHandler}
          packId={currentFocus.packId}
          listId={info.togetherPackingList._id}
          updatePacker={updatePacker}
        />
      )}
      {invitationModalOpen && (
        <ModalForInvitation
          inviteCode={info.togetherPackingList.inviteCode}
          modalHandler={invitationModalCloseHandler}
        />
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
  display: flex;
  //100% - subheader - device
  height: calc(100% - 11rem - 10rem);
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  margin-bottom: 24.4rem;
  padding: 0 2rem;
  padding-top: 1.6rem;
`;
const StyledBg = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const StyledModal = styled.div`
  width: 30rem;
  height: 10rem;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
`;
