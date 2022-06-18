import GithubIcon from './GithubIcon'
import styled from 'styled-components'
import WTDrawer from './WTDrawer'

const FileBar = styled.div`
  --tw-bg-opacity: 1;
  background-color: rgb(41 37 36 / var(--tw-bg-opacity));
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  gap: 0.5rem;
  justify-content: space-between;
  display: flex;
  @media (min-width: 768px) {
    justify-content: end;
  }
`

const Ul = styled.ul`
  padding: 0.5rem;
  gap: 0.5rem;
  justify-content: flex-end;
  display: flex;
  list-style: none;
  margin: 0;
  overflow: hidden;
`

const Li = styled.li`
  background-color: ${(props) =>
    props.fileActive ? 'rgb(68, 64, 60);' : 'none;'}
  color: ${(props) =>
    props.fileActive ? 'rgb(231 229 228);' : 'rgb(168 162 158);'}
  font-size: 0.75rem;
  line-height: 1.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  flex-shrink: 0;
  align-items: center;
  gap: 0.25rem;
  display: ${(props) => (props.fileActive ? 'flex;' : 'none;')}
  &:hover {
    background-color: ${(props) =>
      props.fileActive ? 'rgb(87 83 78);' : 'inherit;'}
  }
`

const FileName = styled.div`
  display: block;
  ${Li}:hover & {
    display: none;
  }
`

const FilePath = styled.div`
  display: none;
  ${Li}:hover & {
    display: block;
  }
`

function GitHubLink(owner, repo, path) {
  return (
    <a
      href={`https://github.com/${owner}/${repo}/blob/master/${path}`}
      target="_blank"
      rel="noreferrer"
    >
      <GithubIcon />
    </a>
  )
}

function FileIcon({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
        clipRule="evenodd"
      />
    </svg>
  )
}

const FileIconStyled = styled(FileIcon)`
  height: 1rem;
  width: 1rem;
`

function WTFileBar({ files, activeFile, config, toggleShowCode }) {
  return (
    <FileBar>
      <WTDrawer drawerClick={toggleShowCode} />
      <Ul>
        {files.map((file) => (
          <Li key={file.path} fileActive={file.path === activeFile.path}>
            <FileIconStyled />
            <FileName>{file.path.split('/').pop()}</FileName>
            <FilePath>{file.path}</FilePath>
          </Li>
        ))}
      </Ul>
      {/*<GitHubLink owner={config.code.owner} repo={config.code.repo} path={activeFile.path} />*/}
    </FileBar>
  )
}

export default WTFileBar
