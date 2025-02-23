import fs from 'fs';
import path from 'path';

const Info = ({ sections }) => {
  return (
    <div>
      <div style={{ display: 'flex', paddingTop: '80px', maxWidth: '1200px', margin: '0 auto' }}>
        <nav style={styles.sidebar}>
          {Object.entries(sections).map(([key, section], index) => (
            <a key={index} href={`#${key}`} style={styles.navLink}>
              {section.title}
            </a>
          ))}
        </nav>
        <div style={styles.content}>
          {Object.entries(sections).map(([key, section], index) => (
            <div key={index} id={key}>
              <h2 style={styles.sectionTitle}>{section.title}</h2>
              {section.content.split('\n').map((para, paraIndex) => (
                <p key={paraIndex} style={styles.textBlock}>{para}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const sectionFiles = {
    geological_info: '1. Rock Type and Formation on the East Coast of Lake Victoria, Tanzania',
    getting_there_info: '2. Getting to Lake Victoria, Travelling Tanzania',
    access_and_ethics_info: '3. Access and Ethics',
  };
  const content = {};

  for (const [key, title] of Object.entries(sectionFiles)) {
    const filePath = path.join(process.cwd(), 'content', `${key}.txt`);
    content[key] = {
      title: title,
      content: fs.readFileSync(filePath, 'utf-8'),
    };
  }

  return {
    props: {
      sections: content,
    },
  };
};

const styles = {
  sidebar: {
    width: '25%',
    padding: '20px',
    position: 'fixed',
    top: '80px',
    left: '0',
    height: '100%',
    backgroundColor: '#f8f8f8',
    borderRight: '1px solid #ddd',
  },
  content: {
    width: '75%',
    marginLeft: '25%',
    padding: '20px',
  },
  navLink: {
    display: 'block',
    marginBottom: '10px',
    textDecoration: 'none',
    color: '#000',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '28px',
    paddingBottom: '10px',
    borderBottom: '2px solid #ddd',
    marginBottom: '20px',
  },
  textBlock: {
    marginBottom: '20px',
    lineHeight: '1.6',
    fontSize: '18px',
  },
};

export default Info;
