import { ReactNode, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation, Pagination } from 'swiper';

import 'swiper/css/pagination';
import 'swiper/css/navigation';

import InitLogo from '../assets/home_init.svg';
import Image from 'next/image';

import { packmanColors } from '../../styles/color';

SwiperCore.use([Virtual, Navigation, Pagination]);

interface SwiperProps {
  key?: string;
  children: ReactNode[];
}

function SwiperContainer(props: SwiperProps) {
  const { children } = props;

  const [swiperRef, setSwiperRef] = useState<SwiperCore>();
  const [bullet, setBullet] = useState<string[]>(['함께 패킹', '혼자 패킹']);
  const [initialLables, setInitialLabels] = useState<string[]>([
    '친구와 함께 짐 목록을 작성해보세요',
    '짐 목록을 작성해보세요',
  ]);
  const [initialButtons, setInitialButtonss] = useState<string[]>([
    '함께 패킹 시작하기',
    '혼자 패킹 시작하기',
  ]);
  // Create array with 2 slides
  const [slides, setSlides] = useState(Array.from({ length: 2 }).map((_, idx) => ''));

  // 최근 수정 리스트 존재 체크
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<div class="' + className + '">' + bullet[index] + '</div>';
    },
  };

  return (
    <StyledRoot isEmpty={isEmpty}>
      <StyledSwiper onSwiper={setSwiperRef} modules={[Pagination]} pagination={pagination} virtual>
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
            {children[index] ? (
              children[index]
            ) : (
              <>
                <Image src={InitLogo} width={258} height={258} alt="test" />
                <StyledInitialWrapper>
                  <StyledLabel>{initialLables[index]}</StyledLabel>
                  {!isEmpty && <StyledStratButton>{initialButtons[index]}</StyledStratButton>}
                </StyledInitialWrapper>
              </>
            )}
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </StyledRoot>
  );
}

export default SwiperContainer;

export const StyledRoot = styled.div<{ isEmpty: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 4rem);
`;

export const StyledSwiper = styled(Swiper)`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  .swiper-pagination {
    display: flex;
    top: 0;
    height: 4rem;
    width: 100%;
    border: 1px solid ${packmanColors.pmDeepGrey};
    border-radius: 0.6rem;
    background: ${packmanColors.white};
  }

  .swiper-pagination-bullet {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 0.6rem;
    color: ${packmanColors.pmDeepGrey};
    font-size: 16px;
    background: ${packmanColors.white};
  }
  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet,
  .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 0 !important;
  }

  .swiper-pagination-bullet-active {
    color: ${packmanColors.white};
    background: ${packmanColors.pmBlack};
  }
  .swiper-slide {
    padding-top: 4.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% - 3rem);
  height: 4.5rem;
  margin-bottom: 2.4rem;
`;

export const StyledButton = styled.button`
  border: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

export const StyledInitialWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  width: 100%;
`;

export const StyledLabel = styled.p`
  font-size: 1.4rem;
  color: ${packmanColors.pmDeepGrey};
  margin-bottom: 1rem;
`;

export const StyledStratButton = styled.button`
  width: 100%;
  padding: 1.2rem 2.9rem;
  font-size: 1.4rem;
  color: ${packmanColors.white};
  background: ${packmanColors.pmPink};
  border: none;
  border-radius: 8px;
`;
