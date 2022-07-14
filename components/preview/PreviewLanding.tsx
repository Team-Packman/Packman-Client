import React, { useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import useAPI from '../../utils/hooks/useAPI';
import { useQuery, useQueryClient } from 'react-query';
import PackagesWithCategory from '../common/PackagesWithCategory';
import { GetTemplateOutput } from '../../service/ect';
import PackingCategory from '../common/PackingCategory';
import PackingItem from '../common/PackingItem';

function PreviewLanding() {
  const [modalOpen, setModalOpen] = useState(false);
  const getTemplate = useAPI((api) => api.ect.getTemplate);
  const { data } = useQuery('template', getTemplate, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const modalOpenHandler = () => setModalOpen(true);

  const modalCloseHandler = () => setModalOpen(false);

  const client = useQueryClient();

  const updateCategory = (value: string, id: string) => {
    const prev: GetTemplateOutput = client.getQueryData('template')!;
    const category = prev.data.category.map((e) => {
      if (e.id === id) {
        e.name = value;
      }
      return e;
    });
    const newData = {
      ...prev,
      category,
    };
    client.setQueryData('template', newData);
  };

  const updateItem = (value: string, id: string) => {
    const prev: GetTemplateOutput = client.getQueryData('template')!;
    const category = prev.data.category.map((e) => {
      e.pack.map((e) => {
        if (e.id === id) {
          e.name = value;
        }
        return e;
      });
      return e;
    });
    const newData = {
      ...prev,
      category,
    };
    client.setQueryData('template', newData);
  };

  if (!data) return null;
  const { data: template } = data;

  return (
    <Layout
      back
      title="템플릿 미리보기"
      option={<StyledTemplateTitle>{template.title}</StyledTemplateTitle>}
    >
      <StyledList>
        {template.category.map(({ id, name, pack }) => (
          <PackagesWithCategory
            key={id}
            category={<PackingCategory id={id} name={name} updateCategory={updateCategory} />}
            packages={
              <>
                {pack.map(({ id, name, isChecked }) => (
                  <PackingItem
                    key={id}
                    id={id}
                    name={name}
                    updateItem={updateItem}
                    isChecked={isChecked}
                    assginee={<div style={{ width: '8.3rem', textAlign: 'center' }}>유나딩딩</div>}
                  />
                ))}
              </>
            }
          />
        ))}
      </StyledList>
      {modalOpen && (
        <StyledBg>
          <StyledModal>
            <button onClick={() => alert('hi')}>btn</button>
          </StyledModal>
        </StyledBg>
      )}
    </Layout>
  );
}

export default PreviewLanding;

const StyledTemplateTitle = styled.div`
  display: flex;
  align-items: center;
  height: 6.9rem;
  font-size: 2.8rem;
  font-weight: 700;
  background-color: ${packmanColors.white};
  box-shadow: 0px 3px 13px rgba(0, 0, 0, 0.05);
  padding: 0 2rem;
`;

const StyledList = styled.ul`
  list-style: none;
`;

const StyledBg = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const StyledModal = styled.div``;
