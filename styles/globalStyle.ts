import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
        --vh: 100%;
    }

    html,
    body {
        width: 100%;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
        padding: 0;
        margin: 0;
        line-height: 1.6;
        font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 62.5%;
        position:fixed;
        overflow: hidden;
        @media (max-height:700px){
            font-size: 56.25%;
        }
    }

    * {
        box-sizing: border-box !important;
        -moz-box-sizing:border-box !important; /* Firefox */
        -webkit-box-sizing:border-box !important; /* Safari */
        transition: ${createTransitionQuery()};
        -webkit-tap-highlight-color:rgba(0,0,0,0); // 아이폰 버튼 클릭 깜박임 해제
    }
    
    input,
    button,
    select,
    textarea,
    optgroup,
    option {
        font-family: inherit;
        font-size: inherit;
        font-style: inherit;
        font-weight: inherit;
    }

    input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 1px solid black;
        background: #fff;
        border-radius: 4px;
        cursor: pointer;
        height: 16px;
        width: 16px;
        outline: 0;
    }
    input[type="checkbox"]::after {
        display: none;
    }
    input[type="checkbox"]:checked {
        background: #FF307B;
        border: 1px solid #FF307B;
        
    }
    input[type="checkbox"]:checked::after {
        display: block;
    }
`;

function createTransitionQuery() {
  const properties = ['color', 'background-color', 'border-color'];

  return properties.map((prop) => `${prop} 0.3s`).join(', ');
}
