import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import profileReducer from "./Slices/ProfileSlice";
import servicesCategoriesReducr from "./Slices/ServiceCategoriesSlice";
import CompensationCategoriesSlice from "./Slices/CompensationCategoriesSlice";
import FleetRequestTypeSlice from "./Slices/FleetRequestTypeSlice";
import SuppliersSlice from "./Slices/SuppliersSlice";
import CompanyManagementsSlice from "./Slices/CompanyManagementsSlice";
import countriesReducer from "./Slices/CountriesSlice";
import regionReducer from "./Slices/RegionSlice";
import CityReducer from "./Slices/CitiesSlice";
import googleMapLinksReducer from "./Slices/GoogleMapLinksSlice";
import positionsReducer from "./Slices/PositionsSlice";
import officeReducer from "./Slices/OfficesSlice";
import FleetManagementTypesSlice from "./Slices/FleetManagementTypesSlice";
import FileArchiveTypeSlice from "./Slices/FileArchiveTypeSlice";
import VehicleCompaniesSlice from "./Slices/VehicleCompaniesSlice";
import OrderIssueTypesSlice from "./Slices/OrderIssueTypesSlice";
import JobsSlice from "./Slices/JobsSlice";
import OfficeDocumentTypeSlice from "./Slices/OfficeDocumentTypeSlice";
import DocumentTypeSlice from "./Slices/DocumentTypeSlice";
import AttachmentTypesSlice from "./Slices/AttachmentTypesSlice"; 
import SalesAccountsSlice from "./Slices/SalesAccountsSlice"; 
import SalesReturnsAccountsSlice from "./Slices/SalesReturnsAccountsSlice"; 
import RelatedPartyAccountsSlice from "./Slices/RelatedPartyAccountsSlice"; 
import PurchasesAccountsSlice from "./Slices/PurchasesAccountsSlice"; 
import PurchaseReturnsAccountsSlice from "./Slices/PurchaseReturnsAccountsSlice"; 
import EmployeesSlice from "./Slices/EmployeesSlice"; 
import FAQsSlice from "./Slices/FAQsSlice"; 
import ClientsSlice from "./Slices/ClientsSlice"; 
import BanksSlice from "./Slices/BanksSlice"; 
import BusinessSectorSlice from "./Slices/BusinessSectorSlice"; 
import ServiceTypesSlice from "./Slices/ServiceTypesSlice"; 
import QuotationFeaturesSlice from "./Slices/QuotationFeaturesSlice"; 
import LoadTypesSlice from "./Slices/LoadTypesSlice"; 
import GoodTypesSlice from "./Slices/GoodTypesSlice"; 
import CarDepartmentsSlice from "./Slices/CarDepartmentsSlice"; 
import MainSettingsSlice from "./Slices/MainSettingsSlice"; 
import FurnitureQuestionsSlice from "./Slices/FurnitureQuestionsSlice"; 
import CategoryRushHoursSlice from "./Slices/CategoryRushHoursSlice"; 
import ChartAccountsSlice from "./Slices/ChartAccountsSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    servicesCategories: servicesCategoriesReducr,
    compensationCategories: CompensationCategoriesSlice,
    fleet_request_types: FleetRequestTypeSlice,
    suppliers: SuppliersSlice,
    company_managements: CompanyManagementsSlice,
    countries: countriesReducer,
    regions: regionReducer,
    cities: CityReducer,
    GoogleMapLinks: googleMapLinksReducer,
    positions: positionsReducer,
    offices: officeReducer,
    fleet_request_types: FleetManagementTypesSlice,
    file_archive_types: FileArchiveTypeSlice,
    vehicle_companies: VehicleCompaniesSlice,
    order_issue_types: OrderIssueTypesSlice,
    job_company_managements: JobsSlice,
    office_document_types: OfficeDocumentTypeSlice,
    document_type: DocumentTypeSlice,
    attachment_types: AttachmentTypesSlice,
    sales_accounts: SalesAccountsSlice,
    sales_returns_accounts: SalesReturnsAccountsSlice,
    related_party_accounts: RelatedPartyAccountsSlice,
    purchases_accounts: PurchasesAccountsSlice,
    purchase_returns_accounts: PurchaseReturnsAccountsSlice,
    employees: EmployeesSlice,
    faqs: FAQsSlice,
    clients: ClientsSlice,
    banks: BanksSlice,
    businessSector: BusinessSectorSlice,
    serviceTypes:ServiceTypesSlice,
    quotationFeatures:QuotationFeaturesSlice,
    loadTypes:LoadTypesSlice,
    goodTypes:GoodTypesSlice,
    car_departments:CarDepartmentsSlice,
    main_settings:MainSettingsSlice,
    furniture_questions:FurnitureQuestionsSlice,
    category_rush_hours:CategoryRushHoursSlice,
    chart_accounts:ChartAccountsSlice
  },
});

export default store;
