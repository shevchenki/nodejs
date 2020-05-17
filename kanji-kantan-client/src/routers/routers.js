import React from 'react';
import Search from './../components/Search/Search';
import N1_Lesson_Master from './../components/Kanji/N1_Lesson_Master/N1_Lesson_Master';
import N1_Kanji_Lesson from './../components/Kanji/N1_Kanji_Lesson/N1_Kanji_Lesson';
import N1_Voca_Lesson from './../components/Kanji/N1_Voca_Lesson/N1_Voca_Lesson';
import N1_Grammar_Lesson from './../components/Grammar/N1_Grammar_Lesson';
import Note_Master_Table from './../components/Note/Note_Master_Table';
import NotFound from './../components/NotFound/notFound';

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Search />
    },
    {
        path: '/kanji',
        exact: true,
        main: ({ match }) => <N1_Lesson_Master match={match} />
    },
    {
        path: '/kanji/:id',
        exact: false,
        main: ({ match }) => <N1_Kanji_Lesson match={match} />
    },
    {
        path: '/vocabulary',
        exact: true,
        main: ({ match }) => <N1_Lesson_Master match={match} />
    },
    {
        path: '/vocabulary/:id',
        exact: false,
        main: ({ match }) => <N1_Voca_Lesson match={match} />
    },
    {
        path: '/grammar',
        exact: true,
        main: ({ match }) => <N1_Grammar_Lesson match={match} />
    },
    {
        path: '/note',
        exact: true,
        main: ({ match }) => <Note_Master_Table match={match} />
    },
    {
        path: '',
        exact: true,
        main: () => <NotFound />
    }
];

export default routes;