import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const hogeActions = {
    update: actionCreator<string>('ACTIONS_UPDATE'),
};
