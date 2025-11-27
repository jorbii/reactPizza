import React from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../Redux/Slices/filterSlice";

import styles from './Search.module.scss';


export const Search = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.filter.searchValue);
    const inputRef = React.useRef();

    const [localValue, setLocalValue] = React.useState('');

    const onClikerClear = () => {
        setLocalValue('');
        dispatch(setSearchValue (''));
        inputRef.current.focus();
    };

    const updateSearch = React.useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 500),
        []
    );

    const onChangeInput = (e) => {
        setLocalValue(e.target.value);
        updateSearch(e.target.value);
    };

   


    return (
        <div className={styles.root}>
            <input
                ref ={inputRef}
                value={localValue}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск пиццы ..."
            />
            {localValue && (
                <svg
                    onClick={onClikerClear}
                    className={styles.clearIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                >
                    <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"/>
                </svg>
            )}
        </div>
    );
};

export default Search;
