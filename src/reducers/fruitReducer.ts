import { Fruit } from '../types/fruit';

// Define your state type
type State = {
  fruits: Fruit[];
  jar: Fruit[];
  groupBy: string;
  notification: string | null;
  loading: boolean;
};

// Define your action types
type Action =
  | { type: 'SET_FRUITS'; payload: Fruit[] }
  | { type: 'SET_GROUP_BY'; payload: string }
  | { type: 'ADD_TO_JAR'; payload: Fruit }
  | { type: 'REMOVE_FROM_JAR'; payload: Fruit }
  | { type: 'REMOVE_ALL_FRUITS' }
  | { type: 'SET_NOTIFICATION'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const initialState: State = {
  fruits: [],
  jar: [],
  groupBy: 'None',
  notification: null,
  loading: true,
};

// Reducer function
const fruitReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FRUITS':
      return { ...state, fruits: action.payload };
    case 'SET_GROUP_BY':
      return { ...state, groupBy: action.payload };
    case 'ADD_TO_JAR':
      return { ...state, jar: [...state.jar, action.payload] };
    case 'REMOVE_FROM_JAR':
      return { ...state, jar: state.jar.filter((fruit) => fruit.name !== action.payload.name) };
    case 'REMOVE_ALL_FRUITS':
      return { ...state, jar: [] };
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
