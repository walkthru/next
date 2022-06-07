import style from './WTCode.module.css'
import GithubIcon from './GithubIcon'
import styled from 'styled-components'

const Li = styled.li`
  background-color: ${props => props.fileActive ? 'rgb(87 83 78);' : 'none;' }
  color: ${props => props.fileActive ? 'rgb(231 229 228);' : 'rgb(168 162 158);' }
  font-size: 0.75rem;
  line-height: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  flex-shrink: 0;
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

function WTFileBar({ files, activeFile, config }) {
  return (
    <div className={style.codeFiles}>
      <ul>
        {files.map((file) => (
          <Li
            key={file.path}
            fileActive={file.path === activeFile.path}
          >
            <FileName>{file.path.split('/').pop()}</FileName>
            <FilePath>{file.path}</FilePath>
          </Li>
        ))}
      </ul>
      <a
        href={`https://github.com/${config.code.owner}/${config.code.repo}/blob/master/${activeFile.path}`}
        target="_blank"
        rel="noreferrer"
      >
        <GithubIcon />
      </a>
    </div>
  )
}

export default WTFileBar
