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

interface UpdateItemPayload {
  name: string;
  listId: string;
  categoryId: string;
  packId: string;
  isChecked: boolean;
}

function PreviewLanding() {
  const client = useQueryClient();
  const [_, setScroll] = useGlobalState('scroll', false);
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

  const { data: info } = packingListData;
  const {
    data: { members },
  } = membersData;
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
  const updateCategory = (value: string, id: string, listId: string) => {
    if (currentEditing) {
      console.log('update category', {
        id,
        name: value,
      });
    } else if (currentCreatingCategory) {
      console.log('add category', {
        name: value,
        listId,
      });
    }
    const prev: GetTogetherPackingListDeatilOutput | undefined =
      client.getQueryData('getPackingListDeatil');
    const category = prev?.data.togetherPackingList.category.map((e) => {
      if (e.id === id) {
        e.name = value;
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
  const updateItem = ({ name, listId, packId, categoryId, isChecked }: UpdateItemPayload) => {
    const prev: GetTogetherPackingListDeatilOutput | undefined =
      client.getQueryData('getPackingListDeatil');

    if (currentEditing) {
      console.log('update!!', {
        name,
        listId,
        isChecked,
        id: packId,
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
      });
    }

    setCurrentEditing('');
    createdHandler();
  };
  const onEdit = () => setCurrentEditing(currentFocus);
  const onDelete = () => console.log('delete!!', currentFocus);
  const ScrollEvent = (e: UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop < 10) {
      setScroll(false);
    }
    if (!isScrolling) {
      if (e.currentTarget.scrollTop >= 10) {
        setIsScrolling(true);
        setScroll(true);
      }
      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  return (
    <Layout
      back
      title="템플릿 미리보기"
      //needs handler props
      option={
        <CheckListHeader together activeMode={activeMode} modeHandler={modeHandler}>
          {info.title}
        </CheckListHeader>
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
        <FunctionSection />
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
  height: calc(100% - 11rem - 15rem);
  //마지막은 디바이스 조절 변수
  margin-top: 1.6rem;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  margin-bottom: 24.4rem;
  padding: 0 2rem;
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
