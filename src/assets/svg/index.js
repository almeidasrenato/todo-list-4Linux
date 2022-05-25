const addIcon = (disable) =>
  `<svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7.99998 4.66665C7.63331 4.66665 7.33331 4.96665 7.33331 5.33331V7.33331H5.33331C4.96665 7.33331 4.66665 
7.63331 4.66665 7.99998C4.66665 8.36665 4.96665 8.66665 5.33331 8.66665H7.33331V10.6666C7.33331 11.0333 7.63331 
11.3333 7.99998 11.3333C8.36665 11.3333 8.66665 11.0333 8.66665 10.6666V8.66665H10.6666C11.0333 8.66665 
11.3333 8.36665 11.3333 7.99998C11.3333 7.63331 11.0333 7.33331 10.6666 7.33331H8.66665V5.33331C8.66665 
4.96665 8.36665 4.66665 7.99998 4.66665ZM7.99998 1.33331C4.31998 1.33331 1.33331 4.31998 1.33331 
7.99998C1.33331 11.68 4.31998 14.6666 7.99998 14.6666C11.68 14.6666 14.6666 11.68 14.6666 
7.99998C14.6666 4.31998 11.68 1.33331 7.99998 1.33331ZM7.99998 13.3333C5.05998 13.3333 2.66665 
10.94 2.66665 7.99998C2.66665 5.05998 5.05998 2.66665 7.99998 2.66665C10.94 2.66665 13.3333 
5.05998 13.3333 7.99998C13.3333 10.94 10.94 13.3333 7.99998 13.3333Z'
fill='${!disable ? "#1499EF" : "#DFDFDF"}'
    />
  </svg>`;

const removeIcon = () =>
  `<svg
    width='75'
    height='75'
    viewBox='0 0 75 75'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M21.875 37.5C21.875 39.2188 23.2812 40.625 25 40.625H50C51.7188 40.625 53.125 39.2188 53.125 37.5C53.125
 35.7812 51.7188 34.375 50 34.375H25C23.2812 34.375 21.875 35.7812 21.875 37.5ZM37.5 6.25C20.25 6.25 6.25 20.25
  6.25 37.5C6.25 54.75 20.25 68.75 37.5 68.75C54.75 68.75 68.75 54.75 68.75 37.5C68.75 20.25 54.75 6.25 37.5
   6.25ZM37.5 62.5C23.7188 62.5 12.5 51.2812 12.5 37.5C12.5 23.7188 23.7188 12.5 37.5 12.5C51.2812 12.5 62.5
    23.7188 62.5 37.5C62.5 51.2812 51.2812 62.5 37.5 62.5Z'
      fill='#F56D5B'
    />
  </svg>`;

const checkBoxDisabledIcon = () =>
  `<svg
    width='100'
    height='100'
    viewBox='0 0 100 100'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M50 8.33331C27 8.33331 8.33334 27 8.33334 50C8.33334 73 27 91.6667 50 91.6667C73 91.6667 91.6667 73 91.6667 50C91.6667 27 73 8.33331 50 8.33331ZM50 83.3333C31.625 83.3333 16.6667 68.375 16.6667 50C16.6667 31.625 31.625 16.6666 50 16.6666C68.375 16.6666 83.3334 31.625 83.3334 50C83.3334 68.375 68.375 83.3333 50 83.3333Z'
      fill='#C9C9C9'
    />
  </svg>`;

const checkBoxEnabledIcon = () =>
  `<svg
    width='100'
    height='100'
    viewBox='0 0 100 100'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M50 8.33331C27 8.33331 8.33331 27 8.33331 50C8.33331 73 27 91.6667 50 91.6667C73 91.6667 91.6667 73 91.6667 50C91.6667 27 73 8.33331 50 8.33331ZM38.7083 67.875L23.75 52.9166C22.125 51.2916 22.125 48.6666 23.75 47.0416C25.375 45.4166 28 45.4166 29.625 47.0416L41.6666 59.0417L70.3333 30.375C71.9583 28.75 74.5833 28.75 76.2083 30.375C77.8333 32 77.8333 34.625 76.2083 36.25L44.5833 67.875C43 69.5 40.3333 69.5 38.7083 67.875Z'
      fill='#4DCA66'
    />
  </svg>`;

const addButton = () =>
  `<svg
    width="104"
    height="104"
    viewBox="0 0 104 104"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M52 0.333313C23.48 0.333313 0.333328 23.48 0.333328 52C0.333328 80.52 23.48 103.667 52 103.667C80.52 103.667 103.667 80.52 103.667 52C103.667 23.48 80.52 0.333313 52 0.333313ZM72.6667 57.1666H57.1667V72.6666C57.1667 75.5083 54.8417 77.8333 52 77.8333C49.1583 77.8333 46.8333 75.5083 46.8333 72.6666V57.1666H31.3333C28.4917 57.1666 26.1667 54.8416 26.1667 52C26.1667 49.1583 28.4917 46.8333 31.3333 46.8333H46.8333V31.3333C46.8333 28.4916 49.1583 26.1666 52 26.1666C54.8417 26.1666 57.1667 28.4916 57.1667 31.3333V46.8333H72.6667C75.5083 46.8333 77.8333 49.1583 77.8333 52C77.8333 54.8416 75.5083 57.1666 72.6667 57.1666Z"
      fill="#1499EF"
    />
  </svg>`;

export {
  addIcon,
  removeIcon,
  checkBoxDisabledIcon,
  checkBoxEnabledIcon,
  addButton,
};
