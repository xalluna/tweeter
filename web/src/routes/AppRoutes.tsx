import { Route, Routes } from 'react-router-dom';
import { routes } from './index';
import { HomePage } from '../pages/home/HomePage';
import { ErrorPage } from '../pages/error/ErrorPage';
import { NotFoundPage } from '../pages/notFound/NotFoundPage';
import { TopicsListingPage } from '../pages/topics/TopicsListingPage';
import { SubscriptionListing } from '../subscriptions/SubscriptionListing';
import { TopicCreatePage } from '../pages/topics/TopicCreatePage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={routes.home} element={<HomePage />} errorElement={<ErrorPage />} />
      <Route path={routes.topics} element={<TopicsListingPage />} errorElement={<ErrorPage />} />
      <Route path={routes.topicCreate} element={<TopicCreatePage />} errorElement={<ErrorPage />} />
      <Route
        path={routes.subscriptions}
        element={<SubscriptionListing />}
        errorElement={<ErrorPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
