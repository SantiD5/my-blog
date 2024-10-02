import { Card } from '../Card/Card'
import './main.css'
export const Main = () =>{
  return(
   <div className="main">
    <Card minutes="4 min read" date="19/07/24" category="Technology"/>
    <Card minutes="4 min read" date="19/07/24" category="Technology"/>
    <Card minutes="4 min read" date="19/07/24" category="Technology"/>
    <Card minutes="4 min read" date="19/07/24" category="Technology"/>
   </div>
  )
}