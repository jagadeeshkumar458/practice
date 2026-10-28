import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TechHub from './pages/TechHub'
import QuizPage from './pages/QuizPage'
import ChallengeList from './pages/ChallengeList'
import ChallengeDetail from './pages/ChallengeDetail'
import InterviewQA from './pages/InterviewQA'
import PracticeList from './pages/PracticeList'
import PracticeDetail from './pages/PracticeDetail'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:techId" element={<TechHub />} />
        <Route path="/:techId/quiz" element={<QuizPage />} />
        <Route path="/:techId/code" element={<ChallengeList />} />
        <Route path="/:techId/code/:challengeId" element={<ChallengeDetail />} />
        <Route path="/:techId/interview" element={<InterviewQA />} />
        <Route path="/:techId/practice" element={<PracticeList />} />
        <Route path="/:techId/practice/:problemId" element={<PracticeDetail />} />
      </Routes>
    </HashRouter>
  )
}
