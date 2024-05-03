import { createGlobalStyle, css } from "styled-components"

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ${({ theme }) => css`
    html {
      font-size: 16px;
      height: 100%;
    }

    main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
  `}

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  .container-content {
    max-width: 1200px;
    width: 100%;
    margin: auto;
    padding: 0px 1rem;
  }
`

export default GlobalStyles
