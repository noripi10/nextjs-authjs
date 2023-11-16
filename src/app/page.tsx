import { cloudinary } from '@/libs/cloudinary';
import HomeClientPage from './_components/pages/HomeClientPage';

export default async function Home() {
  const results = await cloudinary.search
    .expression('resource_type:image')
    .sort_by('public_id', 'desc')
    .max_results(8)
    .execute();
  // console.info('resources', results.resources);

  return <HomeClientPage resources={results.resources} />;
}
