import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/climbs.module.css';

const Climbs = ({ climbs }) => {
  console.log('Climbs data:', climbs);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Climb Index</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.wideColumn}>Name</th>
              <th className={styles.narrowColumn}>Grade</th>
              <th className={styles.wideColumn}>Area</th>
              <th className={styles.wideColumn}>First Ascensionist</th>
              <th className={styles.narrowColumn}>First Ascent Year</th>
            </tr>
          </thead>
          <tbody>
            {climbs.map(climb => (
              <tr key={climb.id}>
                <td className={styles.wideColumn}>
                  <Link href={`/node/${climb.id}`} legacyBehavior>
                    <a className={styles.link}>{climb.name}</a>
                  </Link>
                </td>
                <td className={styles.narrowColumn}>{climb.grade || 'N/A'}</td>
                <td className={styles.wideColumn}>{climb.area || 'N/A'}</td>
                <td className={styles.wideColumn}>{climb.first_ascensionist || 'N/A'}</td>
                <td className={styles.narrowColumn}>
                  {climb.first_ascent_date ? new Date(climb.first_ascent_date).getFullYear() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    console.log('Fetching climbs data...');
    const response = await axios.get('http://localhost:8000/climbs/');
    console.log('Fetched climbs:', response.data);
    return {
      props: {
        climbs: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching climbs:', error);
    return {
      props: {
        climbs: [],
      },
    };
  }
}

export default Climbs;
