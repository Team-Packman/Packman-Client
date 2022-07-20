import React, { useState, UIEvent } from 'react';
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
import { GetTogetherPackingListDeatilOutput } from '../../service/packingList/together';
import PackingItem, { UpdateItemPayload } from '../common/PackingItem';
import useGlobalState from '../../utils/hooks/useGlobalState';
import { packmanColors } from '../../styles/color';
import Packer from '../common/Packer';
import PackerModal from './PackerModal';
import BottomModal from '../../pages/components/common/BottomModal';
import FunctionSection from '../common/FunctionSection';
import AddTemplateButton from '../common/AddTemplateButton';
import { createTogetherAPI } from '../../service/packingList/together/createAPI';

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
  const [scroll, setScroll] = useGlobalState('scroll', false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [bottomModalOpen, setBottomModalOpen] = useState(false);
  const [packerModalOpen, setPackerModalOpen] = useState(false);
  const [activeMode, setActiveMode] = useState(0);
  //category, item 끼리 서로 id 중복 X?
  const [currentCreatingCategory, setCurrentCreatingCategory] = useState('');
  const [currentCreating, setCurrentCreating] = useState('');
  const [currentFocus, setCurrentFocus] = useState('');
  const [currentEditing, setCurrentEditing] = useState('');

  /////////////////// api /////////////////////
  const getPackingListDeatil = useAPI((api) => api.packingList.together.getPackingListDeatil);
  const addPackingListCategory = useAPI((api) => api.packingList.together.addPackingListCategory);
  const addPackingListItem = useAPI((api) => api.packingList.together.addPackingListItem);
  const updatePackingListCategory = useAPI(
    (api) => api.packingList.together.updatePackingListCategory,
  );
  const updatePackingListItem = useAPI((api) => api.packingList.together.updatePackingListItem);
  const updatePackingListTitle = useAPI((api) => api.packingList.together.updatePackingListTitle);
  const getGroupMembers = useAPI((api) => api.packingList.together.getGroupMembers);

  const { data: packingListData } = useQuery('getPackingListDeatil', () =>
    getPackingListDeatil('62d6a1f5bb972fa649b14e9e'),
  );

  const { mutate: addCategory } = useMutation('addPackingListCategory', addPackingListCategory);
  const { mutate: addItem } = useMutation('addPackingListItem', addPackingListItem);
  const { mutate: patchCategory } = useMutation(
    'updatePackingListCategory',
    updatePackingListCategory,
  );
  const { mutate: patchItem } = useMutation('updatePackingListItem', updatePackingListItem);
  const { mutate: patchTitle } = useMutation('updatePackingListTitle', updatePackingListTitle);
  ////////////////////////////////////////////

  // const { data: membersData } = useQuery('getGroupMembers', () => getGroupMembers('3'), {
  //   suspense: true,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  // });
  if (!packingListData) return null;

  // const {
  //   data: { members },
  // } = membersData;
  const { data: info } = packingListData;
  const packingRole = [info.togetherPackingList, info.myPackingList];
  const modeHandler = (idx: number) => setActiveMode(idx);
  const creatingHandler = (id: string) => setCurrentCreating(id);
  const createdHandler = () => setCurrentCreating('');
  const creatingCategoryHandler = () => setCurrentCreatingCategory(packingRole[activeMode]._id);
  const createdCategoryHandler = () => setCurrentCreatingCategory('');
  const bottomModalOpenHandler = (id: string) => {
    if (!currentEditing) {
      setCurrentFocus(id);
      setBottomModalOpen(true);
    }
  };
  const bottomModalCloseHandler = () => {
    setCurrentFocus('');
    setBottomModalOpen(false);
  };
  const packerModalOpenHandler = (packId: string) => {
    console.log('packId :>> ', packId);
    setCurrentFocus(packId);
    setPackerModalOpen(true);
  };
  const packerModalCloseHandler = () => {
    setCurrentFocus('');
    setPackerModalOpen(false);
  };
  const updateCategory = (payload: UpdateCategoryPayload) => {
    const { name, categoryId, listId } = payload;
    if (currentEditing) {
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
    } else if (currentCreatingCategory) {
      if (name.length === 0) {
        createdCategoryHandler();
        return;
      }
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
    }
    setCurrentEditing('');
    createdCategoryHandler();
  };
  //id는 필요 x > categoryId 필요
  //add
  const updateItem = (payload: UpdateItemPayload) => {
    const { name, listId, packId, categoryId, isChecked } = payload;

    if (currentEditing) {
      if (name !== '') {
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
      }
    } else if (currentCreating) {
      if (name.length !== 0) {
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
        createdHandler();
      }
    } else if (!currentFocus) {
      //Needs optimistic update
      // isChecked 수정 필요
      patchItem(
        {
          name,
          listId,
          isChecked: !isChecked,
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

    setCurrentEditing('');
    createdHandler();
  };
  const updateRemainingInfo = (payload: RemainingInfoPayload, type: RemainingInfoType) => {
    const { listId, title = '', departureDate = '', isSaved = false, isAloned = false } = payload;

    switch (type) {
      case 'title':
        patchTitle({
          _id: listId,
          title,
          isAloned,
        });
        return;
      case 'departure':
        console.log({
          listId,
          departureDate,
          isAloned,
        });
        return;
      case 'save':
        console.log({
          listId,
          isSaved,
          isAloned,
        });
        return;
      default:
        return;
    }
  };
  const onEdit = () => setCurrentEditing(currentFocus);
  const onDelete = () => console.log('delete!!', currentFocus);
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
                              modalHandler={() => bottomModalOpenHandler(packId)}
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
                      createHandler={() => creatingHandler(categoryId)}
                      creating={
                        <PackingItem
                          listId={list._id}
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
                        //수정용
                        categoryId={categoryId}
                        //생성용
                        listId={list._id}
                        name={name}
                        updateCategory={updateCategory}
                        modalHandler={() => bottomModalOpenHandler(categoryId)}
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
          />
        </FunctionSection>
      </StyledTogetherLanding>
      {bottomModalOpen && (
        <StyledBg onClick={bottomModalCloseHandler}>
          <StyledModal>
            <button onClick={onEdit}>update</button>
            <button onClick={onDelete}>delete</button>
          </StyledModal>
        </StyledBg>
      )}
      {/* {packerModalOpen && (
        <PackerModal
          members={members}
          modalHandler={packerModalCloseHandler}
          packId={currentFocus}
          listId={info.togetherPackingList._id}
        />
      )} */}
    </Layout>
  );
}

export default TogetherLanding;

const StyledTogetherLanding = styled.div`
  height: 100%;
  background-color: ${packmanColors.white};
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
  z-index: 45;
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;
