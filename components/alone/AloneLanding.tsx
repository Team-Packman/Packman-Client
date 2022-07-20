import React, { UIEvent, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient } from 'react-query';
import Layout from '../common/Layout';
import useGlobalState from '../../utils/hooks/useGlobalState';
import CheckListHeader from '../together/CheckListHeader';
import useAPI from '../../utils/hooks/useAPI';
import CheckListSubHeader from '../together/CheckListSubHeader';
import { packmanColors } from '../../styles/color';
import PackagesWithCategory from '../common/PackagesWithCategory';
import PackingItem, { UpdateItemPayload } from '../common/PackingItem';
import { GetAlonePackingListDetailOutput } from '../../service/packingList/alone';
import PackingCategory, { UpdateCategoryPayload } from '../common/PackingCategory';
import FunctionSection from '../common/FunctionSection';
import AddTemplateButton from '../common/AddTemplateButton';
import SharePackingListButton from '../common/SharePackingListButton';

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
  const [scroll, setScroll] = useGlobalState('scroll', false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentFocus, setCurrentFocus] = useState('');
  const [currentCreating, setCurrentCreating] = useState('');
  const [currentEditing, setCurrentEditing] = useState('');
  const [currentCreatingCategory, setCurrentCreatingCategory] = useState('');
  const [bottomModalOpen, setBottomModalOpen] = useState(false);

  const getPackingListDeatil = useAPI((api) => api.packingList.alone.getPackingListDeatil);
  const { data } = useQuery('getAlonePackingListDeatil', () => getPackingListDeatil('3'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  if (!data) return null;
  const { data: list } = data;
  const creatingHandler = (id: string) => setCurrentCreating(id);
  const createdHandler = () => setCurrentCreating('');
  const creatingCategoryHandler = () => setCurrentCreatingCategory(list._id);
  const createdCategoryHandler = () => setCurrentCreatingCategory('');
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

  const updateCategory = (payload: UpdateCategoryPayload) => {
    const { name, categoryId, listId } = payload;
    if (currentEditing) {
      console.log('update category', {
        id: categoryId,
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
    const prev: GetAlonePackingListDetailOutput | undefined = client.getQueryData(
      'getAlonePackingListDeatil',
    );
    const category = prev?.data.category.map((e) => {
      if (e._id === categoryId) {
        e.name = name;
      }
      return e;
    });
    const newData = {
      ...prev,
      category,
    };
    client.setQueryData('getAlonePackingListDeatil', newData);
    setCurrentEditing('');
    createdCategoryHandler();
  };
  //id는 필요 x > categoryId 필요
  //add
  const updateItem = (payload: UpdateItemPayload) => {
    const { name, listId, packId, categoryId, isChecked } = payload;
    const prev: GetAlonePackingListDetailOutput | undefined = client.getQueryData(
      'getAlonePackingListDeatil',
    );

    if (currentEditing) {
      console.log('update!!', {
        name,
        listId,
        isChecked,
        id: packId,
        categoryId,
      });

      if (name !== '') {
        const category = prev?.data.category.map((e) => {
          e.pack.map((e) => {
            if (e._id === packId) {
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
        client.setQueryData('getAlonePackingListDeatil', newData);
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
        category: prev?.data.category.map((e) => {
          if (e._id === categoryId) {
            e.pack.push({
              _id: 'created ID',
              name,
              isChecked: false,
              packer: null,
            });
          }
        }),
      };

      client.setQueryData('getAlonePackingListDeatil', newData);
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
          listId={list._id}
          departureDate={list.departureDate}
          title={list.title}
          updateRemainingInfo={updateRemainingInfo}
        />
      }
    >
      <StyledAloneLanding>
        <CheckListSubHeader categoryHandler={creatingCategoryHandler} />
        <StyledBody onScroll={ScrollEvent}>
          {list.category.map(({ _id: categoryId, name, pack }) => (
            <PackagesWithCategory
              key={categoryId}
              packages={
                <>
                  {pack.map(({ _id: packId, name, isChecked }) => (
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
        <FunctionSection>
          <AddTemplateButton
            onClick={() => updateRemainingInfo({ listId: list._id, isSaved: true }, 'save')}
          >
            나만의 템플릿으로 추가
          </AddTemplateButton>
          <SharePackingListButton icon>패킹 리스트 공유</SharePackingListButton>
        </FunctionSection>
      </StyledAloneLanding>
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
