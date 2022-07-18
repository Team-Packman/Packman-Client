import React, { useState, UIEvent } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import useAPI from '../../utils/hooks/useAPI';
import { useQuery, useQueryClient } from 'react-query';
import PackagesWithCategory from '../common/PackagesWithCategory';
import PackingCategory from '../common/PackingCategory';
import CheckListHeader from './CheckListHeader';
import { Pagination, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import CheckListSubHeader from './CheckListSubHeader';
import { GetTogetherPackingListDeatilOutput } from '../../service/packingList/together';
import PackingItem from '../common/PackingItem';
import useGlobalState from '../../utils/hooks/useGlobalState';
import { packmanColors } from '../../styles/color';
import Packer from '../common/Packer';
import PackerModal from './PackerModal';
import BottomModal from '../../pages/components/common/BottomModal';
import FunctionSection from '../common/FunctionSection';
import AddTemplateButton from '../common/AddTemplateButton';

interface UpdateItemPayload {
  name: string;
  listId: string;
  categoryId: string;
  packId: string;
  isChecked: boolean;
}

interface RemainingInfoPayload {
  listId: string;
  title?: string;
  departureDate?: string;
  isSaved?: boolean;
  isAloned?: boolean;
}

type RemainingInfoType = 'title' | 'departure' | 'save';

function PreviewLanding() {
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
  const getPackingListDeatil = useAPI((api) => api.packingList.together.getPackingListDeatil);
  const getGroupMembers = useAPI((api) => api.packingList.together.getGroupMembers);
  const { data: packingListData } = useQuery(
    'getPackingListDeatil',
    () => getPackingListDeatil('3'),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const { data: membersData } = useQuery('getGroupMembers', () => getGroupMembers('3'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (!packingListData || !membersData) return null;

  const {
    data: { members },
  } = membersData;
  const { data: info } = packingListData;
  const packingRole = [info.togetherPackingList, info.myPackingList];
  const modeHandler = (idx: number) => setActiveMode(idx);
  const creatingHandler = (id: string) => setCurrentCreating(id);
  const createdHandler = () => setCurrentCreating('');
  const creatingCategoryHandler = () => setCurrentCreatingCategory(packingRole[activeMode].id);
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
  const updateCategory = (name: string, id: string, listId: string) => {
    if (currentEditing) {
      console.log('update category', {
        id,
        name,
      });
    } else if (currentCreatingCategory) {
      if (name.length === 0) {
        createdCategoryHandler();
        return;
      }
      console.log('add category', {
        name,
        listId,
      });
    }
    const prev: GetTogetherPackingListDeatilOutput | undefined =
      client.getQueryData('getPackingListDeatil');
    const category = prev?.data.togetherPackingList.category.map((e) => {
      if (e.id === id) {
        e.name = name;
      }
      return e;
    });
    const newData = {
      ...prev,
      category,
    };
    client.setQueryData('getPackingListDeatil', newData);
    setCurrentEditing('');
    createdCategoryHandler();
  };
  //id는 필요 x > categoryId 필요
  //add
  const updateItem = (payload: UpdateItemPayload) => {
    const { name, listId, packId, categoryId, isChecked } = payload;
    const prev: GetTogetherPackingListDeatilOutput | undefined =
      client.getQueryData('getPackingListDeatil');

    if (currentEditing) {
      console.log('update!!', {
        name,
        listId,
        isChecked,
        id: packId,
        categoryId,
      });

      if (name !== '') {
        const category = prev?.data.togetherPackingList.category.map((e) => {
          e.pack.map((e) => {
            if (e.id === packId) {
              e.name = name;
            }
            return e;
          });
          return e;
        });
        const newData = {
          ...prev,
          category,
        };
        client.setQueryData('getPackingListDeatil', newData);
      }
    } else if (currentCreating) {
      if (name.length === 0) {
        createdHandler();
        return;
      }
      console.log('add!! pack', {
        name,
        listId,
        categoryId,
      });

      const newData = {
        ...prev,
        category: prev?.data.togetherPackingList.category.map((e) => {
          if (e.id === categoryId) {
            e.pack.push({
              id: 'created ID',
              name,
              isChecked: false,
              packer: null,
            });
          }
        }),
      };

      client.setQueryData('getPackingListDeatil', newData);
    } else if (!currentFocus) {
      //Needs optimistic update
      console.log('check!!', {
        name,
        listId,
        isChecked: !isChecked,
        id: packId,
        categoryId,
      });
    }

    setCurrentEditing('');
    createdHandler();
  };
  const updateRemainingInfo = (payload: RemainingInfoPayload, type: RemainingInfoType) => {
    const { listId, title, departureDate, isSaved, isAloned = false } = payload;

    switch (type) {
      case 'title':
        console.log({
          listId,
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
      //needs handler props
      option={
        <CheckListHeader
          together
          listId={info.togetherPackingList.id}
          departureDate={info.departureDate}
          title={info.title}
          activeMode={activeMode}
          updateRemainingInfo={updateRemainingInfo}
        />
      }
    >
      <StyledPreviewLanding>
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
                <StyledBody onScroll={ScrollEvent}>
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
                        //수정용
                        id={categoryId}
                        //생성용
                        listId={list.id}
                        name={name}
                        updateCategory={updateCategory}
                        modalHandler={() => bottomModalOpenHandler(categoryId)}
                        isEditing={currentEditing === categoryId}
                      />
                    </PackagesWithCategory>
                  ))}
                  {currentCreatingCategory === list.id && (
                    <PackagesWithCategory>
                      <PackingCategory
                        id={'creating'}
                        listId={list.id}
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
              updateRemainingInfo({ listId: info.togetherPackingList.id, isSaved: true }, 'save')
            }
          />
        </FunctionSection>
      </StyledPreviewLanding>
      {bottomModalOpen && (
        <StyledBg onClick={bottomModalCloseHandler}>
          <StyledModal>
            <button onClick={onEdit}>update</button>
            <button onClick={onDelete}>delete</button>
          </StyledModal>
        </StyledBg>
      )}
      {packerModalOpen && (
        <PackerModal
          members={members}
          modalHandler={packerModalCloseHandler}
          packId={currentFocus}
        />
      )}
    </Layout>
  );
}

export default PreviewLanding;

const StyledPreviewLanding = styled.div`
  height: 100%;
  background-color: ${packmanColors.white};
  overflow: hidden;
`;

const StyledBody = styled.div`
  display: flex;
  height: calc(100% - 11rem - 10rem);
  //마지막은 디바이스 조절 변수
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
