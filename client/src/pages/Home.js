import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../utils/queries";
import { STORE_USER_DATA } from "../utils/actions";
import Search from '../components/Search';
import ShowCard from '../components/ShowCard';

function Home() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const { data } = useQuery(QUERY_USER);

    if (data && state && data.user && !state.dataQueried) {
        dispatch({
            type: STORE_USER_DATA,
            payload: data.user
        });
    }

    return (
        <>
            <Search mode={'Home'} />
            <div className="content-background">
                {state.searchResults.length > 0 && (
                    <section className="showcard-container">
                        {state.searchResults.map((showData, i) => (
                            <ShowCard key={showData.show.id} show={showData.show} />
                        ))}
                    </section>
                    )}
                {state.searchSubmitted && state.searchResults.length === 0 && (
                    <h3 className="error-text">No shows found</h3>
                )}
            </div>
        </>
    );
}

export default Home;
