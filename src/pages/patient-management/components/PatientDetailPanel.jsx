import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ExamInfoSection from './full-exam/ExamInfoSection';
import ChiefComplaintSection from './full-exam/ChiefComplaintSection';
import MedicalHistorySection from './full-exam/MedicalHistorySection';
import POHxSection from './full-exam/POHxSection';
import PreliminaryExamSection from './full-exam/PreliminaryExamSection';
import PupilPainSection from './full-exam/PupilPainSection';
import HorizontalVergenceGraph from './full-exam/HorizontalVergenceGraph';
import VerticalVergenceScatter from './full-exam/VerticalVergenceScatter';
import OgleSynoptophoreGraph from './full-exam/OgleSynoptophoreGraph';
import ZoneOfComfortGraph from './full-exam/ZoneOfComfortGraph';
import AccommodativeFunctionBar from './full-exam/AccommodativeFunctionBar';
import VergenceAccommodationDemandPlot from './full-exam/VergenceAccommodationDemandPlot';

// Modal Components
const ViewFullExamModal = ({ isOpen, onClose, examData }) => {
  if (!isOpen || !examData) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg p-6 w-full max-w-7xl mx-4 max-h-[90vh] overflow-y-auto mt-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Full Examination Report</h3>
            <p className="text-sm text-gray-600 mt-1">
              {examData.type} • {new Date(examData.date).toLocaleDateString()} • {examData.doctor}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Left Column - Patient Info & History */}
          <div className="xl:col-span-1 space-y-6">
            <ExamInfoSection examData={examData} />
            <ChiefComplaintSection examData={examData} />
            <MedicalHistorySection examData={examData} />
            <POHxSection examData={examData} />
            <PreliminaryExamSection examData={examData} />
          </div>

          {/* Right Column - Examination Results */}
          <div className="xl:col-span-3 space-y-6">
            {/* Visual Acuity */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Icon name="Eye" size={16} className="mr-2" />
                Visual Acuity Test
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-2 text-left font-medium text-gray-700">Eye</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-700">VAsc</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-700">VAcc</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-700">VAnear</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-700">VA(PH)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-3 py-2 font-medium text-gray-700">OD</td>
                      <td className="px-3 py-2 text-center">{examData.rightEyeUnaided}</td>
                      <td className="px-3 py-2 text-center">{examData.rightEyeAided}</td>
                      <td className="px-3 py-2 text-center">{examData.rightEyeNear || "20/25"}</td>
                      <td className="px-3 py-2 text-center">{examData.rightEyePinhole}</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-gray-700">OS</td>
                      <td className="px-3 py-2 text-center">{examData.leftEyeUnaided}</td>
                      <td className="px-3 py-2 text-center">{examData.leftEyeAided}</td>
                      <td className="px-3 py-2 text-center">{examData.leftEyeNear || "20/25"}</td>
                      <td className="px-3 py-2 text-center">{examData.leftEyePinhole}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <PupilPainSection examData={examData} />

            {/* Refraction Results */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="Target" size={16} className="mr-2" />
                Refraction Results
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Left Column: Auto Refraction, Keratometry */}
                <div className="space-y-6">
                  {/* Auto Refraction */}
                  <div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="bg-gray-700 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Icon name="Activity" size={16} className="text-white" />
                          <h5 className="font-semibold text-white">Auto Refraction</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-3 py-2 text-left font-medium text-gray-700">Eye</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Sphere</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Cylinder</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Axis</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">VA</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="px-3 py-2 font-medium text-gray-700">OD</td>
                                <td className="px-3 py-2 text-center">{examData.autoRefOdSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.autoRefOdCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.autoRefOdAxis}</td>
                                <td className="px-3 py-2 text-center">{examData.autoRefOdVa}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 font-medium text-gray-700">OS</td>
                                <td className="px-3 py-2 text-center">{examData.autoRefOsSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.autoRefOsCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.autoRefOsAxis}</td>
                                <td className="px-3 py-2 text-center">{examData.autoRefOsVa}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Keratometry */}
                  <div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="bg-gray-700 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Icon name="Target" size={16} className="text-white" />
                          <h5 className="font-semibold text-white">Keratometry</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-3 py-2 text-left font-medium text-gray-700">Eye</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Sphere</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Cylinder</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Axis</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="px-3 py-2 font-medium text-gray-700">OD</td>
                                <td className="px-3 py-2 text-center">{examData.keratoOdSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.keratoOdCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.keratoOdAxis}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 font-medium text-gray-700">OS</td>
                                <td className="px-3 py-2 text-center">{examData.keratoOsSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.keratoOsCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.keratoOsAxis}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column: Retinoscopy, Mono Subjective, BVA */}
                <div className="space-y-6 mt-6 md:mt-0">
                  {/* Retinoscopy */}
                  <div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="bg-gray-700 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Icon name="Eye" size={16} className="text-white" />
                          <h5 className="font-semibold text-white">Retinoscopy</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-3 py-2 text-left font-medium text-gray-700">Eye</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Sphere</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Cylinder</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Axis</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">VA</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="px-3 py-2 font-medium text-gray-700">OD</td>
                                <td className="px-3 py-2 text-center">{examData.retinoOdSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.retinoOdCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.retinoOdAxis}</td>
                                <td className="px-3 py-2 text-center">{examData.retinoVaOd}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 font-medium text-gray-700">OS</td>
                                <td className="px-3 py-2 text-center">{examData.retinoOsSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.retinoOsCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.retinoOsAxis}</td>
                                <td className="px-3 py-2 text-center">{examData.retinoVaOs}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Mono Subjective */}
                  <div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="bg-gray-700 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Icon name="Target" size={16} className="text-white" />
                          <h5 className="font-semibold text-white">Mono Subjective</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-3 py-2 text-left font-medium text-gray-700">Eye</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Sphere</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Cylinder</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Axis</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">VA</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="px-3 py-2 font-medium text-gray-700">OD</td>
                                <td className="px-3 py-2 text-center">{examData.monoSubOdSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.monoSubOdCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.monoSubOdAxis}</td>
                                <td className="px-3 py-2 text-center">{examData.monoSubVaOd}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 font-medium text-gray-700">OS</td>
                                <td className="px-3 py-2 text-center">{examData.monoSubOsSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.monoSubOsCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.monoSubOsAxis}</td>
                                <td className="px-3 py-2 text-center">{examData.monoSubVaOs}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* BVA (Best Vision Acuity) */}
                  <div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="bg-gray-700 px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Icon name="Eye" size={16} className="text-white" />
                          <h5 className="font-semibold text-white">BVA (Best Vision Acuity)</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-3 py-2 text-left font-medium text-gray-700">Eye</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Sphere</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Cylinder</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">Axis</th>
                                <th className="px-3 py-2 text-center font-medium text-gray-700">VA</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="px-3 py-2 font-medium text-gray-700">OD</td>
                                <td className="px-3 py-2 text-center">{examData.bvaOdSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.bvaOdCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.bvaOdAxis}</td>
                                <td className="px-3 py-2 text-center">{examData.bvaVaOd}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 font-medium text-gray-700">OS</td>
                                <td className="px-3 py-2 text-center">{examData.bvaOsSphere}</td>
                                <td className="px-3 py-2 text-center">{examData.bvaOsCylinder}</td>
                                <td className="px-3 py-2 text-center">{examData.bvaOsAxis}</td>
                                <td className="px-3 py-2 text-center">{examData.bvaVaOs}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Binocular Vision & Accommodation Graphs */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Icon name="BarChart2" size={16} className="mr-2" />
                Binocular Vision & Accommodation Graphs
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <VergenceAccommodationDemandPlot />
                </div>
                <div>
                  <HorizontalVergenceGraph />
                  <OgleSynoptophoreGraph />
                  <ZoneOfComfortGraph />
                </div>
                <div>
                  <VerticalVergenceScatter />
                  <AccommodativeFunctionBar />
                </div>
              </div>
            </div>

            {/* Clinical Examination */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Icon name="Activity" size={16} className="mr-2" />
                Clinical Examination
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Slit Lamp */}
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Slit Lamp Examination</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-gray-600 mb-2">OD</h6>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-gray-600">Anterior Segment:</span> {examData.rightEyeAnteriorSegment}</div>
                        <div><span className="text-gray-600">Cornea:</span> {examData.rightEyeCornea}</div>
                        <div><span className="text-gray-600">Iris:</span> {examData.rightEyeIris}</div>
                        <div><span className="text-gray-600">Lens:</span> {examData.rightEyeLens}</div>
                      </div>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-600 mb-2">OS</h6>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-gray-600">Anterior Segment:</span> {examData.leftEyeAnteriorSegment}</div>
                        <div><span className="text-gray-600">Cornea:</span> {examData.leftEyeCornea}</div>
                        <div><span className="text-gray-600">Iris:</span> {examData.leftEyeIris}</div>
                        <div><span className="text-gray-600">Lens:</span> {examData.leftEyeLens}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fundus */}
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Fundus Examination</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-gray-600 mb-2">OD</h6>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-gray-600">Retina:</span> {examData.rightEyeRetina}</div>
                        <div><span className="text-gray-600">Optic Nerve:</span> {examData.rightEyeOpticNerve}</div>
                        <div><span className="text-gray-600">Macula:</span> {examData.rightEyeMacula}</div>
                        <div><span className="text-gray-600">Vessels:</span> {examData.rightEyeVessels}</div>
                      </div>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-600 mb-2">OS</h6>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-gray-600">Retina:</span> {examData.leftEyeRetina}</div>
                        <div><span className="text-gray-600">Optic Nerve:</span> {examData.leftEyeOpticNerve}</div>
                        <div><span className="text-gray-600">Macula:</span> {examData.leftEyeMacula}</div>
                        <div><span className="text-gray-600">Vessels:</span> {examData.leftEyeVessels}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Tests & IOP */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Icon name="Activity" size={16} className="mr-2" />
                Additional Tests & Measurements
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* IOP */}
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Intraocular Pressure (IOP)</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Method:</span>
                      <p className="text-gray-800">{examData.iopMethod}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <p className="text-gray-800">{examData.time}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">mmHg:</span>
                      <p className="text-gray-800">{examData.mmhg}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">OD:</span>
                      <p className="text-gray-800">{examData.od}</p>
                    </div>
                  </div>
                </div>

                {/* Pupil */}
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Pupil Size</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium text-gray-600 mb-2">OD</h6>
                      <div className="space-y-1 text-sm">
                        <div><span className="text-gray-600">Photo:</span> {examData.pupilOdPhoto}</div>
                        <div><span className="text-gray-600">Meso:</span> {examData.pupilOdMeso}</div>
                      </div>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-600 mb-2">OS</h6>
                      <div className="space-y-1 text-sm">
                        <div><span className="text-gray-600">Photo:</span> {examData.pupilOsPhoto}</div>
                        <div><span className="text-gray-600">Meso:</span> {examData.pupilOsMeso}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Findings & Treatment */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Icon name="FileText" size={16} className="mr-2" />
                Findings & Treatment Plan
              </h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Clinical Findings</h5>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">{examData.findings?.clinical}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Diagnosis</h5>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">{examData.findings?.diagnosis}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Recommendations</h5>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-800">{examData.findings?.recommendations}</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Treatment Plan</h5>
                  <div className="space-y-3">
                    {examData.treatmentPlan?.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-gray-800">{item.action}</div>
                          <div className="text-sm text-gray-600">{item.details}</div>
                          {item.followUp && (
                            <div className="text-sm text-blue-600 mt-1">
                              Follow-up: {item.followUp}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t mt-6">
          <Button onClick={onClose}>
            Close Report
          </Button>
        </div>
      </div>
    </div>
  );
};

const ScheduleAppointmentModal = ({ isOpen, onClose, onSave, patient }) => {
  const [formData, setFormData] = useState({
    appointmentType: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, patientId: patient.patientId });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Schedule Appointment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Patient:</strong> {patient.name} ({patient.patientId})
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Appointment Type"
            value={formData.appointmentType}
            onChange={(e) => setFormData({...formData, appointmentType: e.target.value})}
            options={[
              { value: '', label: 'Select Type' },
              { value: 'eye-exam', label: 'Eye Exam' },
              { value: 'contact-fitting', label: 'Contact Lens Fitting' },
              { value: 'follow-up', label: 'Follow-up' },
              { value: 'emergency', label: 'Emergency' },
              { value: 'consultation', label: 'Consultation' }
            ]}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <Input
              label="Time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
          </div>
          
          <Input
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes..."
          />
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Schedule
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddPrescriptionModal = ({ isOpen, onClose, onSave, patient }) => {
  const [formData, setFormData] = useState({
    prescriptionType: '',
    rightEye: { sphere: '', cylinder: '', axis: '' },
    leftEye: { sphere: '', cylinder: '', axis: '' },
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, patientId: patient.patientId, date: new Date().toISOString() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Prescription</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Patient:</strong> {patient.name} ({patient.patientId})
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Prescription Type"
            value={formData.prescriptionType}
            onChange={(e) => setFormData({...formData, prescriptionType: e.target.value})}
            options={[
              { value: '', label: 'Select Type' },
              { value: 'distance', label: 'Distance Glasses' },
              { value: 'reading', label: 'Reading Glasses' },
              { value: 'bifocal', label: 'Bifocal' },
              { value: 'progressive', label: 'Progressive' },
              { value: 'contacts', label: 'Contact Lenses' }
            ]}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">OD</h4>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  label="Sphere"
                  value={formData.rightEye.sphere}
                  onChange={(e) => setFormData({
                    ...formData, 
                    rightEye: {...formData.rightEye, sphere: e.target.value}
                  })}
                  placeholder="0.00"
                />
                <Input
                  label="Cylinder"
                  value={formData.rightEye.cylinder}
                  onChange={(e) => setFormData({
                    ...formData, 
                    rightEye: {...formData.rightEye, cylinder: e.target.value}
                  })}
                  placeholder="0.00"
                />
                <Input
                  label="Axis"
                  value={formData.rightEye.axis}
                  onChange={(e) => setFormData({
                    ...formData, 
                    rightEye: {...formData.rightEye, axis: e.target.value}
                  })}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">OS</h4>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  label="Sphere"
                  value={formData.leftEye.sphere}
                  onChange={(e) => setFormData({
                    ...formData, 
                    leftEye: {...formData.leftEye, sphere: e.target.value}
                  })}
                  placeholder="0.00"
                />
                <Input
                  label="Cylinder"
                  value={formData.leftEye.cylinder}
                  onChange={(e) => setFormData({
                    ...formData, 
                    leftEye: {...formData.leftEye, cylinder: e.target.value}
                  })}
                  placeholder="0.00"
                />
                <Input
                  label="Axis"
                  value={formData.leftEye.axis}
                  onChange={(e) => setFormData({
                    ...formData, 
                    leftEye: {...formData.leftEye, axis: e.target.value}
                  })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          
          <Input
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes..."
          />
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Prescription
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GenerateInvoiceModal = ({ isOpen, onClose, onSave, patient }) => {
  const [formData, setFormData] = useState({
    items: [{ description: '', quantity: 1, price: 0 }],
    paymentMethod: '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    onSave({ 
      ...formData, 
      patientId: patient.patientId, 
      total,
      date: new Date().toISOString(),
      status: 'pending'
    });
    onClose();
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Generate Invoice</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Patient:</strong> {patient.name} ({patient.patientId})
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-700">Invoice Items</h4>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Icon name="Plus" size={16} />
                Add Item
              </Button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={index} className="border rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Item {index + 1}</span>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  )}
                </div>
                
                <Input
                  label="Description"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...formData.items];
                    newItems[index].description = e.target.value;
                    setFormData({...formData, items: newItems});
                  }}
                  placeholder="Service or product description"
                  required
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].quantity = parseInt(e.target.value);
                      setFormData({...formData, items: newItems});
                    }}
                    min="1"
                    required
                  />
                  <Input
                    label="Price"
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].price = parseFloat(e.target.value);
                      setFormData({...formData, items: newItems});
                    }}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
          
          <Select
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
            options={[
              { value: '', label: 'Select Payment Method' },
              { value: 'cash', label: 'Cash' },
              { value: 'credit-card', label: 'Credit Card' },
              { value: 'debit-card', label: 'Debit Card' },
              { value: 'insurance', label: 'Insurance' },
              { value: 'payment-plan', label: 'Payment Plan' }
            ]}
            required
          />
          
          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
            required
          />
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Generate Invoice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddTransactionModal = ({ isOpen, onClose, onSave, patient }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: '',
    method: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      ...formData, 
      patientId: patient.patientId,
      date: new Date().toISOString(),
      amount: parseFloat(formData.amount)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add Transaction</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <Icon name="X" size={20} />
          </button>
        </div>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Patient:</strong> {patient.name} ({patient.patientId})
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Transaction description"
            required
          />
          
          <Input
            label="Amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            placeholder="0.00"
            required
          />
          
          <Select
            label="Transaction Type"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            options={[
              { value: '', label: 'Select Type' },
              { value: 'charge', label: 'Charge' },
              { value: 'payment', label: 'Payment' },
              { value: 'refund', label: 'Refund' }
            ]}
            required
          />
          
          <Select
            label="Payment Method"
            value={formData.method}
            onChange={(e) => setFormData({...formData, method: e.target.value})}
            options={[
              { value: '', label: 'Select Method' },
              { value: 'cash', label: 'Cash' },
              { value: 'credit-card', label: 'Credit Card' },
              { value: 'debit-card', label: 'Debit Card' },
              { value: 'insurance', label: 'Insurance' },
              { value: 'check', label: 'Check' }
            ]}
            required
          />
          
          <Input
            label="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Additional notes..."
          />
          
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Transaction
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PatientDetailPanel = ({ patient, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(patient || {});
  const [activeModal, setActiveModal] = useState(null);
  const [selectedExamData, setSelectedExamData] = useState(null);

  if (!patient) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Patient Selected</h3>
          <p className="text-muted-foreground">Select a patient from the list to view details</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'Eye' },
    { id: 'appointments', label: 'Appointments', icon: 'Calendar' },
    { id: 'financial', label: 'Financial', icon: 'DollarSign' }
  ];

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(patient);
    setIsEditing(false);
  };

  const handleModalAction = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedExamData(null);
  };

  const handleViewFullExam = (prescription) => {
    // Generate varied mock exam data based on prescription
    const examTypes = [
      {
        type: "Comprehensive Eye Exam",
        doctor: "Dr. Sarah Johnson",
        duration: "45 minutes",
        chiefComplaint1: "Blurred vision at distance",
        chiefComplaint2: "Eye strain when reading",
        contactLens: false,
        glasses: true,
        blurNear: false,
        blurFar: true,
        diabetes: false,
        hypertension: false,
        heartDisease: false,
        allergies: "None known",
        medications: "None",
        previousEyeSurgery: false,
        eyeInjury: false,
        familyHistory: "Father has myopia",
        bloodPressure: "120/80 mmHg",
        weight: "65 kg",
        height: "170 cm",
        constriction: "Normal",
        pain: "None",
        covertest: "Normal",
        npc: "6cm",
        npa: "8cm",
        stereopsis: "40 arc seconds",
        stereopsisType: "Randot",
        colorVision: "Normal",
        colorVisionType: "Ishihara",
        amsler: "Normal",
        vf: "Full",
        vfType: "Humphrey 24-2",
        rightEyeUnaided: "20/40",
        leftEyeUnaided: "20/35",
        rightEyeAided: "20/20",
        leftEyeAided: "20/20",
        rightEyeNear: "20/25",
        leftEyeNear: "20/25",
        rightEyePinhole: "20/25",
        leftEyePinhole: "20/20",
        rightEyeAdd: "+1.50",
        leftEyeAdd: "+1.50",
        vertexDistance: "12mm",
        retinoOdSphere: "-2.50",
        retinoOdCylinder: "-0.75",
        retinoOdAxis: "90",
        retinoOsSphere: "-2.25",
        retinoOsCylinder: "-0.50",
        retinoOsAxis: "85",
        retinoVaOd: "20/20",
        retinoVaOs: "20/20",
        monoSubOdSphere: "-2.25",
        monoSubOdCylinder: "-0.75",
        monoSubOdAxis: "90",
        monoSubOsSphere: "-2.00",
        monoSubOsCylinder: "-0.50",
        monoSubOsAxis: "85",
        monoSubVaOd: "20/20",
        monoSubVaOs: "20/20",
        bvaOdSphere: "-2.00",
        bvaOdCylinder: "-0.75",
        bvaOdAxis: "90",
        bvaOsSphere: "-1.75",
        bvaOsCylinder: "-0.50",
        bvaOsAxis: "85",
        bvaVaOd: "20/20",
        bvaVaOs: "20/20",
        autoRefOdSphere: "-2.75",
        autoRefOdCylinder: "-0.75",
        autoRefOdAxis: "92",
        autoRefOdVa: "20/25",
        autoRefOsSphere: "-2.50",
        autoRefOsCylinder: "-0.50",
        autoRefOsAxis: "87",
        autoRefOsVa: "20/25",
        keratoOdSphere: "43.50",
        keratoOdCylinder: "44.25",
        keratoOdAxis: "90",
        keratoOsSphere: "43.75",
        keratoOsCylinder: "44.00",
        keratoOsAxis: "85",
        pupilOdPhoto: "3mm",
        pupilOdMeso: "4mm",
        pupilOsPhoto: "3mm",
        pupilOsMeso: "4mm",
        biBlur: "12Δ",
        biBreak: "16Δ",
        biRecovery: "8Δ",
        boBlur: "8Δ",
        boBreak: "12Δ",
        boRecovery: "6Δ",
        rightEyeAnteriorSegment: "Normal",
        leftEyeAnteriorSegment: "Normal",
        rightEyeCornea: "Clear, no opacities",
        leftEyeCornea: "Clear, no opacities",
        rightEyeIris: "Normal color and pattern",
        leftEyeIris: "Normal color and pattern",
        rightEyeLens: "Clear, no cataract",
        leftEyeLens: "Clear, no cataract",
        rightEyeRetina: "Normal appearance",
        leftEyeRetina: "Normal appearance",
        rightEyeOpticNerve: "Pink, well-defined margins",
        leftEyeOpticNerve: "Pink, well-defined margins",
        rightEyeMacula: "Normal foveal reflex",
        leftEyeMacula: "Normal foveal reflex",
        rightEyeVessels: "Normal caliber and course",
        leftEyeVessels: "Normal caliber and course",
        iopMethod: "Goldmann Applanation",
        time: "10:30 AM",
        mmhg: "16",
        od: "16 mmHg",
        bp: "120/80 mmHg",
        findings: {
          clinical: "Patient presents with mild myopia and astigmatism. Corneas are clear, anterior chambers are deep and quiet. Pupils are equal, round, and reactive to light.",
          diagnosis: "Myopia with astigmatism",
          recommendations: "Prescription glasses recommended for distance vision. Regular eye exams every 1-2 years."
        },
        treatmentPlan: [
          {
            action: "Prescribe corrective lenses",
            details: "Distance glasses with anti-reflective coating",
            followUp: "6 months"
          },
          {
            action: "Lifestyle recommendations",
            details: "Limit screen time, take regular breaks",
            followUp: "1 year"
          }
        ]
      },
      {
        type: "Contact Lens Fitting",
        doctor: "Dr. Michael Chen",
        duration: "60 minutes",
        chiefComplaint1: "Want to switch from glasses to contacts",
        chiefComplaint2: "Dry eyes with current contacts",
        contactLens: true,
        glasses: false,
        blurNear: true,
        blurFar: false,
        diabetes: false,
        hypertension: true,
        heartDisease: false,
        allergies: "Latex",
        medications: "Lisinopril 10mg daily",
        previousEyeSurgery: false,
        eyeInjury: false,
        familyHistory: "Mother has glaucoma",
        bloodPressure: "135/85 mmHg",
        weight: "70 kg",
        height: "165 cm",
        constriction: "Slightly sluggish",
        pain: "Mild discomfort",
        covertest: "Exophoria 2Δ",
        npc: "8cm",
        npa: "12cm",
        stereopsis: "60 arc seconds",
        stereopsisType: "Randot",
        colorVision: "Mild red-green deficiency",
        colorVisionType: "Ishihara",
        amsler: "Normal",
        vf: "Full",
        vfType: "Goldmann",
        rightEyeUnaided: "20/60",
        leftEyeUnaided: "20/50",
        rightEyeAided: "20/20",
        leftEyeAided: "20/20",
        rightEyeNear: "20/30",
        leftEyeNear: "20/25",
        rightEyePinhole: "20/30",
        leftEyePinhole: "20/25",
        rightEyeAdd: "+2.00",
        leftEyeAdd: "+1.75",
        vertexDistance: "13mm",
        retinoOdSphere: "-3.25",
        retinoOdCylinder: "-1.00",
        retinoOdAxis: "95",
        retinoOsSphere: "-3.00",
        retinoOsCylinder: "-0.75",
        retinoOsAxis: "88",
        retinoVaOd: "20/20",
        retinoVaOs: "20/20",
        monoSubOdSphere: "-3.00",
        monoSubOdCylinder: "-1.00",
        monoSubOdAxis: "95",
        monoSubOsSphere: "-2.75",
        monoSubOsCylinder: "-0.75",
        monoSubOsAxis: "88",
        monoSubVaOd: "20/20",
        monoSubVaOs: "20/20",
        bvaOdSphere: "-2.75",
        bvaOdCylinder: "-1.00",
        bvaOdAxis: "95",
        bvaOsSphere: "-2.50",
        bvaOsCylinder: "-0.75",
        bvaOsAxis: "88",
        bvaVaOd: "20/20",
        bvaVaOs: "20/20",
        autoRefOdSphere: "-3.50",
        autoRefOdCylinder: "-1.00",
        autoRefOdAxis: "97",
        autoRefOdVa: "20/30",
        autoRefOsSphere: "-3.25",
        autoRefOsCylinder: "-0.75",
        autoRefOsAxis: "90",
        autoRefOsVa: "20/30",
        keratoOdSphere: "43.00",
        keratoOdCylinder: "44.50",
        keratoOdAxis: "95",
        keratoOsSphere: "43.25",
        keratoOsCylinder: "44.25",
        keratoOsAxis: "88",
        pupilOdPhoto: "4mm",
        pupilOdMeso: "5mm",
        pupilOsPhoto: "4mm",
        pupilOsMeso: "5mm",
        biBlur: "8Δ",
        biBreak: "12Δ",
        biRecovery: "6Δ",
        boBlur: "6Δ",
        boBreak: "10Δ",
        boRecovery: "4Δ",
        rightEyeAnteriorSegment: "Normal",
        leftEyeAnteriorSegment: "Normal",
        rightEyeCornea: "Clear, mild dryness",
        leftEyeCornea: "Clear, mild dryness",
        rightEyeIris: "Normal color and pattern",
        leftEyeIris: "Normal color and pattern",
        rightEyeLens: "Clear, no cataract",
        leftEyeLens: "Clear, no cataract",
        rightEyeRetina: "Normal appearance",
        leftEyeRetina: "Normal appearance",
        rightEyeOpticNerve: "Pink, well-defined margins",
        leftEyeOpticNerve: "Pink, well-defined margins",
        rightEyeMacula: "Normal foveal reflex",
        leftEyeMacula: "Normal foveal reflex",
        rightEyeVessels: "Normal caliber and course",
        leftEyeVessels: "Normal caliber and course",
        iopMethod: "Tono-Pen",
        time: "2:15 PM",
        mmhg: "18",
        od: "18 mmHg",
        bp: "135/85 mmHg",
        findings: {
          clinical: "Patient presents for contact lens fitting. Moderate myopia with astigmatism. Corneas show mild dryness. Anterior chambers are deep and quiet.",
          diagnosis: "Moderate myopia with astigmatism, dry eye syndrome",
          recommendations: "Daily disposable contact lenses recommended. Artificial tears for dry eye relief."
        },
        treatmentPlan: [
          {
            action: "Contact lens fitting",
            details: "Daily disposable toric lenses",
            followUp: "1 week"
          },
          {
            action: "Dry eye management",
            details: "Artificial tears 4x daily",
            followUp: "1 month"
          }
        ]
      },
      {
        type: "Glaucoma Screening",
        doctor: "Dr. Emily Rodriguez",
        duration: "30 minutes",
        chiefComplaint1: "Family history of glaucoma",
        chiefComplaint2: "No symptoms",
        contactLens: false,
        glasses: true,
        blurNear: false,
        blurFar: false,
        diabetes: true,
        hypertension: true,
        heartDisease: false,
        allergies: "None",
        medications: "Metformin 500mg, Amlodipine 5mg",
        previousEyeSurgery: false,
        eyeInjury: false,
        familyHistory: "Father has glaucoma, mother has diabetes",
        bloodPressure: "140/90 mmHg",
        weight: "80 kg",
        height: "175 cm",
        constriction: "Normal",
        pain: "None",
        covertest: "Normal",
        npc: "7cm",
        npa: "10cm",
        stereopsis: "80 arc seconds",
        stereopsisType: "Randot",
        colorVision: "Normal",
        colorVisionType: "Ishihara",
        amsler: "Normal",
        vf: "Superior arcuate defect OD",
        vfType: "Humphrey 30-2",
        rightEyeUnaided: "20/25",
        leftEyeUnaided: "20/25",
        rightEyeAided: "20/20",
        leftEyeAided: "20/20",
        rightEyeNear: "20/20",
        leftEyeNear: "20/20",
        rightEyePinhole: "20/20",
        leftEyePinhole: "20/20",
        rightEyeAdd: "+1.25",
        leftEyeAdd: "+1.25",
        vertexDistance: "12mm",
        retinoOdSphere: "-1.50",
        retinoOdCylinder: "-0.25",
        retinoOdAxis: "85",
        retinoOsSphere: "-1.25",
        retinoOsCylinder: "-0.25",
        retinoOsAxis: "90",
        retinoVaOd: "20/20",
        retinoVaOs: "20/20",
        monoSubOdSphere: "-1.25",
        monoSubOdCylinder: "-0.25",
        monoSubOdAxis: "85",
        monoSubOsSphere: "-1.00",
        monoSubOsCylinder: "-0.25",
        monoSubOsAxis: "90",
        monoSubVaOd: "20/20",
        monoSubVaOs: "20/20",
        bvaOdSphere: "-1.00",
        bvaOdCylinder: "-0.25",
        bvaOdAxis: "85",
        bvaOsSphere: "-0.75",
        bvaOsCylinder: "-0.25",
        bvaOsAxis: "90",
        bvaVaOd: "20/20",
        bvaVaOs: "20/20",
        autoRefOdSphere: "-1.75",
        autoRefOdCylinder: "-0.25",
        autoRefOdAxis: "87",
        autoRefOdVa: "20/20",
        autoRefOsSphere: "-1.50",
        autoRefOsCylinder: "-0.25",
        autoRefOsAxis: "92",
        autoRefOsVa: "20/20",
        keratoOdSphere: "44.00",
        keratoOdCylinder: "44.50",
        keratoOdAxis: "85",
        keratoOsSphere: "44.25",
        keratoOsCylinder: "44.75",
        keratoOsAxis: "90",
        pupilOdPhoto: "2.5mm",
        pupilOdMeso: "3.5mm",
        pupilOsPhoto: "2.5mm",
        pupilOsMeso: "3.5mm",
        biBlur: "15Δ",
        biBreak: "20Δ",
        biRecovery: "10Δ",
        boBlur: "10Δ",
        boBreak: "15Δ",
        boRecovery: "8Δ",
        rightEyeAnteriorSegment: "Normal",
        leftEyeAnteriorSegment: "Normal",
        rightEyeCornea: "Clear, no opacities",
        leftEyeCornea: "Clear, no opacities",
        rightEyeIris: "Normal color and pattern",
        leftEyeIris: "Normal color and pattern",
        rightEyeLens: "Clear, no cataract",
        leftEyeLens: "Clear, no cataract",
        rightEyeRetina: "Normal appearance",
        leftEyeRetina: "Normal appearance",
        rightEyeOpticNerve: "C/D ratio 0.6, suspicious for glaucoma",
        leftEyeOpticNerve: "C/D ratio 0.5, normal",
        rightEyeMacula: "Normal foveal reflex",
        leftEyeMacula: "Normal foveal reflex",
        rightEyeVessels: "Normal caliber and course",
        leftEyeVessels: "Normal caliber and course",
        iopMethod: "Goldmann Applanation",
        time: "9:45 AM",
        mmhg: "22",
        od: "22 mmHg",
        bp: "140/90 mmHg",
        findings: {
          clinical: "Patient presents for glaucoma screening due to family history. Elevated IOP in right eye. Suspicious optic nerve appearance OD. Visual field shows superior arcuate defect OD.",
          diagnosis: "Ocular hypertension OD, suspicious for glaucoma",
          recommendations: "Close monitoring required. Consider treatment if IOP remains elevated."
        },
        treatmentPlan: [
          {
            action: "IOP monitoring",
            details: "Monthly IOP checks",
            followUp: "1 month"
          },
          {
            action: "Visual field testing",
            details: "Repeat VF in 3 months",
            followUp: "3 months"
          }
        ]
      }
    ];

    // Select random exam type or use prescription type to determine
    const examTypeIndex = prescription.type.includes("Contact") ? 1 : 
                         prescription.type.includes("Glaucoma") ? 2 : 0;
    const selectedExam = examTypes[examTypeIndex];

    const examData = {
      date: prescription.date,
      type: prescription.type,
      doctor: selectedExam.doctor,
      duration: selectedExam.duration,
      
      // Chief Complaint
      chiefComplaint1: selectedExam.chiefComplaint1,
      chiefComplaint2: selectedExam.chiefComplaint2,
      contactLens: selectedExam.contactLens,
      glasses: selectedExam.glasses,
      blurNear: selectedExam.blurNear,
      blurFar: selectedExam.blurFar,
      
      // Medical History
      diabetes: selectedExam.diabetes,
      hypertension: selectedExam.hypertension,
      heartDisease: selectedExam.heartDisease,
      allergies: selectedExam.allergies,
      medications: selectedExam.medications,
      
      // POHx
      previousEyeSurgery: selectedExam.previousEyeSurgery,
      eyeInjury: selectedExam.eyeInjury,
      familyHistory: selectedExam.familyHistory,
      
      // Preliminary Exam
      bloodPressure: selectedExam.bloodPressure,
      weight: selectedExam.weight,
      height: selectedExam.height,
      constriction: selectedExam.constriction,
      pain: selectedExam.pain,
      covertest: selectedExam.covertest,
      npc: selectedExam.npc,
      npa: selectedExam.npa,
      stereopsis: selectedExam.stereopsis,
      stereopsisType: selectedExam.stereopsisType,
      colorVision: selectedExam.colorVision,
      colorVisionType: selectedExam.colorVisionType,
      amsler: selectedExam.amsler,
      vf: selectedExam.vf,
      vfType: selectedExam.vfType,
      
      // Visual Acuity
      rightEyeUnaided: selectedExam.rightEyeUnaided,
      leftEyeUnaided: selectedExam.leftEyeUnaided,
      rightEyeAided: selectedExam.rightEyeAided,
      leftEyeAided: selectedExam.leftEyeAided,
      rightEyeNear: selectedExam.rightEyeNear,
      leftEyeNear: selectedExam.leftEyeNear,
      rightEyePinhole: selectedExam.rightEyePinhole,
      leftEyePinhole: selectedExam.leftEyePinhole,
      
      // Refraction
      rightEyeSphere: prescription.rightEye.sphere,
      rightEyeCylinder: prescription.rightEye.cylinder,
      rightEyeAxis: prescription.rightEye.axis,
      rightEyeAdd: selectedExam.rightEyeAdd,
      leftEyeSphere: prescription.leftEye.sphere,
      leftEyeCylinder: prescription.leftEye.cylinder,
      leftEyeAxis: prescription.leftEye.axis,
      leftEyeAdd: selectedExam.leftEyeAdd,
      vertexDistance: selectedExam.vertexDistance,
      
      // Retino
      retinoOdSphere: selectedExam.retinoOdSphere,
      retinoOdCylinder: selectedExam.retinoOdCylinder,
      retinoOdAxis: selectedExam.retinoOdAxis,
      retinoOsSphere: selectedExam.retinoOsSphere,
      retinoOsCylinder: selectedExam.retinoOsCylinder,
      retinoOsAxis: selectedExam.retinoOsAxis,
      retinoVaOd: selectedExam.retinoVaOd,
      retinoVaOs: selectedExam.retinoVaOs,
      
      // Mono Sub
      monoSubOdSphere: selectedExam.monoSubOdSphere,
      monoSubOdCylinder: selectedExam.monoSubOdCylinder,
      monoSubOdAxis: selectedExam.monoSubOdAxis,
      monoSubOsSphere: selectedExam.monoSubOsSphere,
      monoSubOsCylinder: selectedExam.monoSubOsCylinder,
      monoSubOsAxis: selectedExam.monoSubOsAxis,
      monoSubVaOd: selectedExam.monoSubVaOd,
      monoSubVaOs: selectedExam.monoSubVaOs,
      
      // BVA
      bvaOdSphere: selectedExam.bvaOdSphere,
      bvaOdCylinder: selectedExam.bvaOdCylinder,
      bvaOdAxis: selectedExam.bvaOdAxis,
      bvaOsSphere: selectedExam.bvaOsSphere,
      bvaOsCylinder: selectedExam.bvaOsCylinder,
      bvaOsAxis: selectedExam.bvaOsAxis,
      bvaVaOd: selectedExam.bvaVaOd,
      bvaVaOs: selectedExam.bvaVaOs,
      
      // Auto Refraction
      autoRefOdSphere: selectedExam.autoRefOdSphere,
      autoRefOdCylinder: selectedExam.autoRefOdCylinder,
      autoRefOdAxis: selectedExam.autoRefOdAxis,
      autoRefOdVa: selectedExam.autoRefOdVa,
      autoRefOsSphere: selectedExam.autoRefOsSphere,
      autoRefOsCylinder: selectedExam.autoRefOsCylinder,
      autoRefOsAxis: selectedExam.autoRefOsAxis,
      autoRefOsVa: selectedExam.autoRefOsVa,
      
      // Keratometry
      keratoOdSphere: selectedExam.keratoOdSphere,
      keratoOdCylinder: selectedExam.keratoOdCylinder,
      keratoOdAxis: selectedExam.keratoOdAxis,
      keratoOsSphere: selectedExam.keratoOsSphere,
      keratoOsCylinder: selectedExam.keratoOsCylinder,
      keratoOsAxis: selectedExam.keratoOsAxis,
      
      // Pupil
      pupilOdPhoto: selectedExam.pupilOdPhoto,
      pupilOdMeso: selectedExam.pupilOdMeso,
      pupilOsPhoto: selectedExam.pupilOsPhoto,
      pupilOsMeso: selectedExam.pupilOsMeso,
      
      // Functional Vergence
      biBlur: selectedExam.biBlur,
      biBreak: selectedExam.biBreak,
      biRecovery: selectedExam.biRecovery,
      boBlur: selectedExam.boBlur,
      boBreak: selectedExam.boBreak,
      boRecovery: selectedExam.boRecovery,
      
      // Slit Lamp
      rightEyeAnteriorSegment: selectedExam.rightEyeAnteriorSegment,
      leftEyeAnteriorSegment: selectedExam.leftEyeAnteriorSegment,
      rightEyeCornea: selectedExam.rightEyeCornea,
      leftEyeCornea: selectedExam.leftEyeCornea,
      rightEyeIris: selectedExam.rightEyeIris,
      leftEyeIris: selectedExam.leftEyeIris,
      rightEyeLens: selectedExam.rightEyeLens,
      leftEyeLens: selectedExam.leftEyeLens,
      
      // Fundus
      rightEyeRetina: selectedExam.rightEyeRetina,
      leftEyeRetina: selectedExam.leftEyeRetina,
      rightEyeOpticNerve: selectedExam.rightEyeOpticNerve,
      leftEyeOpticNerve: selectedExam.leftEyeOpticNerve,
      rightEyeMacula: selectedExam.rightEyeMacula,
      leftEyeMacula: selectedExam.leftEyeMacula,
      rightEyeVessels: selectedExam.rightEyeVessels,
      leftEyeVessels: selectedExam.leftEyeVessels,
      
      // IOP
      iopMethod: selectedExam.iopMethod,
      time: selectedExam.time,
      mmhg: selectedExam.mmhg,
      od: selectedExam.od,
      bp: selectedExam.bp,
      
      // Additional Tests
      additionalTests: [
        {
          name: "Tonometry",
          description: "Intraocular pressure measurement",
          result: `${selectedExam.mmhg} mmHg`,
          status: selectedExam.mmhg > 21 ? "Elevated" : "Normal"
        },
        {
          name: "Slit Lamp Examination",
          description: "Anterior segment examination",
          result: "Clear",
          status: "Normal"
        },
        {
          name: "Fundoscopy",
          description: "Retinal examination",
          result: "Normal optic nerve",
          status: "Normal"
        }
      ],
      
      // Findings & Diagnosis
      findings: selectedExam.findings,
      
      // Treatment Plan
      treatmentPlan: selectedExam.treatmentPlan,
      
      notes: prescription.notes || "Patient reports improved clarity with new prescription. No adverse reactions noted."
    };
    
    setSelectedExamData(examData);
    setActiveModal('viewFullExam');
  };

  const handleModalSave = (data) => {
    console.log('Saving data:', data);
    // Here you would typically save to your backend
    alert('Action completed successfully!');
    
    // Update patient data based on action
    if (activeModal === 'scheduleAppointment') {
      const newAppointment = {
        date: data.date,
        time: data.time,
        type: data.appointmentType,
        status: 'scheduled',
        notes: data.notes
      };
      const updatedPatient = {
        ...patient,
        appointments: [...(patient.appointments || []), newAppointment]
      };
      onUpdate(updatedPatient);
    } else if (activeModal === 'addPrescription') {
      const newPrescription = {
        date: data.date,
        type: data.prescriptionType,
        rightEye: data.rightEye,
        leftEye: data.leftEye,
        notes: data.notes
      };
      const updatedPatient = {
        ...patient,
        prescriptions: [...(patient.prescriptions || []), newPrescription]
      };
      onUpdate(updatedPatient);
    } else if (activeModal === 'generateInvoice') {
      const newTransaction = {
        date: data.date,
        description: `Invoice - ${data.items.map(item => item.description).join(', ')}`,
        amount: data.total,
        type: 'charge',
        method: data.paymentMethod
      };
      const updatedPatient = {
        ...patient,
        transactions: [...(patient.transactions || []), newTransaction],
        financial: {
          ...patient.financial,
          totalDue: (patient.financial?.totalDue || 0) + data.total
        }
      };
      onUpdate(updatedPatient);
    } else if (activeModal === 'addTransaction') {
      const newTransaction = {
        date: data.date,
        description: data.description,
        amount: data.amount,
        type: data.type,
        method: data.method
      };
      const updatedPatient = {
        ...patient,
        transactions: [...(patient.transactions || []), newTransaction],
        financial: {
          ...patient.financial,
          totalPaid: data.type === 'payment' ? 
            (patient.financial?.totalPaid || 0) + data.amount : 
            (patient.financial?.totalPaid || 0),
          totalDue: data.type === 'charge' ? 
            (patient.financial?.totalDue || 0) + data.amount : 
            (patient.financial?.totalDue || 0) - data.amount
        }
      };
      onUpdate(updatedPatient);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="flex items-start space-x-4 pb-6 border-b border-border">
        <div className="flex-shrink-0">
          {patient.photo ? (
            <Image
              src={patient.photo}
              alt={`${patient.name} photo`}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={32} className="text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={isEditing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                iconName={isEditing ? "X" : "Edit"}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              {isEditing && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  iconName="Save"
                >
                  Save
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Patient ID:</span>
              <span className="ml-2 font-medium">{patient.patientId}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                patient.status === 'active' ? 'bg-success text-success-foreground' :
                patient.status === 'pending' ? 'bg-warning text-warning-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {patient.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          
          {isEditing ? (
            <>
              <Input
                label="Phone Number"
                type="tel"
                value={editData.phone || ''}
                onChange={(e) => setEditData({...editData, phone: e.target.value})}
              />
              <Input
                label="Email Address"
                type="email"
                value={editData.email || ''}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
              />
              <Input
                label="Address"
                value={editData.address || ''}
                onChange={(e) => setEditData({...editData, address: e.target.value})}
              />
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{patient.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={16} className="text-muted-foreground mt-1" />
                <span className="text-foreground">{patient.address}</span>
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
          
          {isEditing ? (
            <>
              <Input
                label="Date of Birth"
                type="date"
                value={editData.dateOfBirth || ''}
                onChange={(e) => setEditData({...editData, dateOfBirth: e.target.value})}
              />
              <Select
                label="Gender"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' }
                ]}
                value={editData.gender || ''}
                onChange={(value) => setEditData({...editData, gender: value})}
              />
            </>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-foreground">Born {formatDate(patient.dateOfBirth)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-foreground capitalize">{patient.gender}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Insurance Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Insurance Information</h3>
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-accent" />
              <span className="font-medium text-foreground">
                {patient.insurance?.provider || 'No Insurance'}
              </span>
            </div>
            {patient.insurance?.verified && (
              <span className="px-2 py-1 text-xs font-medium bg-success text-success-foreground rounded-full">
                Verified
              </span>
            )}
          </div>
          {patient.insurance && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Policy Number:</span>
                <span className="ml-2 font-medium">{patient.insurance.policyNumber}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Group Number:</span>
                <span className="ml-2 font-medium">{patient.insurance.groupNumber}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPrescriptions = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Prescription History</h3>
        <Button variant="outline" size="sm" iconName="Plus" onClick={() => handleModalAction('addPrescription')}>
          Add Prescription
        </Button>
      </div>
      
      <div className="space-y-3">
        {patient.prescriptions?.map((prescription, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{prescription.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {formatDate(prescription.date)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewFullExam(prescription)}
                  className="ml-2"
                >
                  <Icon name="FileText" size={14} className="mr-1" />
                  View Full Exam
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">OD:</span>
                <div className="mt-1 space-y-1">
                  <div>SPH: {prescription.rightEye.sphere}</div>
                  <div>CYL: {prescription.rightEye.cylinder}</div>
                  <div>AXIS: {prescription.rightEye.axis}</div>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">OS:</span>
                <div className="mt-1 space-y-1">
                  <div>SPH: {prescription.leftEye.sphere}</div>
                  <div>CYL: {prescription.leftEye.cylinder}</div>
                  <div>AXIS: {prescription.leftEye.axis}</div>
                </div>
              </div>
            </div>
            
            {prescription.notes && (
              <div className="mt-3 pt-3 border-t border-border">
                <span className="text-muted-foreground text-sm">Notes:</span>
                <p className="text-foreground text-sm mt-1">{prescription.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Appointment History</h3>
        <Button variant="outline" size="sm" iconName="Plus" onClick={() => handleModalAction('scheduleAppointment')}>
          Schedule Appointment
        </Button>
      </div>
      
      <div className="space-y-3">
        {patient.appointments?.map((appointment, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{appointment.type}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                appointment.status === 'completed' ? 'bg-success text-success-foreground' :
                appointment.status === 'scheduled' ? 'bg-primary text-primary-foreground' :
                'bg-warning text-warning-foreground'
              }`}>
                {appointment.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-2 font-medium">{formatDate(appointment.date)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Time:</span>
                <span className="ml-2 font-medium">{appointment.time}</span>
              </div>
            </div>
            
            {appointment.notes && (
              <div className="mt-3 pt-3 border-t border-border">
                <span className="text-muted-foreground text-sm">Notes:</span>
                <p className="text-foreground text-sm mt-1">{appointment.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFinancial = () => (
    <div className="space-y-4">
              <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Financial Summary</h3>
          <Button variant="outline" size="sm" iconName="Plus" onClick={() => handleModalAction('addTransaction')}>
            Add Transaction
          </Button>
        </div>
      
      {/* Financial Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {formatCurrency(patient.financial?.totalPaid || 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Paid</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-warning">
            {formatCurrency(patient.financial?.totalDue || 0)}
          </div>
          <div className="text-sm text-muted-foreground">Amount Due</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(patient.financial?.totalSpent || 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </div>
      </div>
      
      {/* Transaction History */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Recent Transactions</h4>
        {patient.transactions?.map((transaction, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} className="text-primary" />
                <span className="font-medium text-foreground">{transaction.description}</span>
              </div>
              <span className={`font-bold ${
                transaction.type === 'payment' ? 'text-success' : 'text-error'
              }`}>
                {transaction.type === 'payment' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{formatDate(transaction.date)}</span>
              <span className="capitalize">{transaction.method}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Patient Details</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          iconName="X"
          className="lg:hidden"
        >
          Close
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'prescriptions' && renderPrescriptions()}
        {activeTab === 'appointments' && renderAppointments()}
        {activeTab === 'financial' && renderFinancial()}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="default" 
            size="sm" 
            iconName="Calendar"
            onClick={() => handleModalAction('scheduleAppointment')}
          >
            Schedule Appointment
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Eye"
            onClick={() => handleModalAction('addPrescription')}
          >
            Add Prescription
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="FileText"
            onClick={() => handleModalAction('generateInvoice')}
          >
            Generate Invoice
          </Button>
        </div>
      </div>

      {/* Modals */}
      <ViewFullExamModal
        isOpen={activeModal === 'viewFullExam'}
        onClose={handleCloseModal}
        examData={selectedExamData}
      />
      <ScheduleAppointmentModal
        isOpen={activeModal === 'scheduleAppointment'}
        onClose={handleCloseModal}
        onSave={handleModalSave}
        patient={patient}
      />
      <AddPrescriptionModal
        isOpen={activeModal === 'addPrescription'}
        onClose={handleCloseModal}
        onSave={handleModalSave}
        patient={patient}
      />
      <GenerateInvoiceModal
        isOpen={activeModal === 'generateInvoice'}
        onClose={handleCloseModal}
        onSave={handleModalSave}
        patient={patient}
      />
      <AddTransactionModal
        isOpen={activeModal === 'addTransaction'}
        onClose={handleCloseModal}
        onSave={handleModalSave}
        patient={patient}
      />
    </div>
  );
};

export default PatientDetailPanel;