import { commonVariables } from '@constants';

/**
 * Calculates pagination parameters.
 *
 * @param _page - The current page number.
 * @param _limit - The number of items per page.
 * @returns An object containing the limit and offset for pagination.
 *          - limit: The adjusted number of items per page.
 *          - offset: The offset from the start of the dataset for the current page.
 */

export const getPagination = (_page: number, _limit: number) => {
  const limit = _limit ? +_limit : commonVariables.paginations.ITEM_LIMIT;
  const offset = _page ? (_page - 1) * limit : commonVariables.paginations.DEFAULT_PAGE;

  return { limit, offset };
};
