/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-danger */
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/router';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return <span>Carregando...</span>;
  }

  const totalWords = post.data.content.reduce((total, contentItem) => {
    if (contentItem.heading) {
      const headingTotalWords = contentItem.heading.split(' ').length;

      total += headingTotalWords;
    }

    const bodyTotalWords = contentItem.body.map(
      item => item.text.split(' ').length
    );

    bodyTotalWords.forEach(word => (total += word));

    return total;
  }, 0);

  const readTime = Math.ceil((totalWords * 60) / 200 / 60);

  return (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>

      <div className={styles.banner}>
        <img src={post.data.banner.url} alt="banner" />
      </div>

      <main className={commonStyles.container}>
        <div className={styles.content}>
          <h1>{post.data.title}</h1>

          <div className={styles.info}>
            <div>
              <FiCalendar />
              <time>
                {format(new Date(post.first_publication_date), 'd MMM yyyy', {
                  locale: ptBR,
                })}
              </time>
            </div>

            <div>
              <FiUser />
              <span>{post.data.author}</span>
            </div>

            <div>
              <FiClock />
              <span>{readTime} min</span>
            </div>
          </div>

          {post.data.content.map(content => (
            <article className={styles.contentBody} key={content.heading}>
              <h2>{content.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('posts', String(slug));

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
  };
};
