import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import KataService from '../../services/KataService';

const kataService = new KataService();

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async function ({ offset, token = null }, { rejectWithValue }) {
    try {
      return await kataService.getArticles(offset, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentArticle = createAsyncThunk(
  'articles/getCurrentArticle',
  async function (slug, { rejectWithValue }) {
    try {
      return await kataService.getCurrentArticle(slug);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postArticle = createAsyncThunk(
  'articles/postArticle',
  async function ({ body, token }, { rejectWithValue }) {
    try {
      return await kataService.postArticle(body, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async function ({ slug, body, token }, { rejectWithValue }) {
    try {
      return await kataService.updateArticle(slug, body, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async function ({ slug, token }, { rejectWithValue }) {
    try {
      return await kataService.deleteArticle(slug, token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const rateArticle = createAsyncThunk(
  'articles/rateArticle',
  async function ({ slug, token = null }, { rejectWithValue, dispatch }) {
    try {
      const res = await kataService.rateArticle(slug, token);
      if (res.article) {
        dispatch(changeFavorite(res.article));
      }
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unRateArticle = createAsyncThunk(
  'articles/unRateArticle',
  async function ({ slug, token = null }, { rejectWithValue, dispatch }) {
    try {
      const res = await kataService.unRateArticle(slug, token);
      if (res.article) {
        dispatch(changeFavorite(res.article));
      }
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    article: null,
    totalCount: 0,
    error: null,
    loading: false,
    success: false,
  },
  reducers: {
    changeSuccess(state, action) {
      state.success = false;
    },
    changeFavorite(state, action) {
      const selected = state.articles.find((item) => item.slug === action.payload.slug);
      selected.favorited = action.payload.favorited;
      selected.favoritesCount = action.payload.favoritesCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload.articles;
      state.totalCount = action.payload.articlesCount;
    });
    builder.addCase(getArticles.rejected, (state, action) => {
      state.loading = false;
      state.articles = null;
      state.totalCount = 0;
      state.error = action.payload;
    });

    builder.addCase(getCurrentArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.article = action.payload.article;
    });
    builder.addCase(getCurrentArticle.rejected, (state, action) => {
      state.loading = false;
      state.article = null;
      state.error = action.payload;
    });

    builder.addCase(postArticle.fulfilled, (state, action) => {
      state.success = true;
    });
    builder.addCase(postArticle.rejected, (state, action) => {
      state.success = false;
    });

    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.success = true;
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.success = false;
    });

    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.success = true;
    });
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.success = false;
    });
  },
});

export const { changeSuccess, changeFavorite } = articlesSlice.actions;
export default articlesSlice.reducer;