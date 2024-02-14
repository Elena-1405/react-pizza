`https://6562128cdcd355c0832487c7.mockapi.io/pizza-react?page=${currentPage}&limit=4&
      ${category}&sortBy=${sortBy}&order=${order}${search}`


      const { value, setValue } = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
    //document.querySelector('input').focus();
    };
  
    const updateSearchValue = useCallback(
     debounce((str) => {
      setSearchValue(str);
    }, 1000), 
    [],
  );

  const onChangeInput = event => {
    //setValue(event.target.value);
    console.log(event.target.value)
    updateSearchValue(event.target.value);
  };
  