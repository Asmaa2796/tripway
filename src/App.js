import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./pages/Footer";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout";
import ExportOrders from "./components/exportOrders/ExportOrders";
import Favourites from "./components/favourites/Favourites";
import Branches from "./components/branches/Branches";
import EditBranch from "./components/branches/EditBranch";
import ViewBranch from "./components/branches/ViewBranch";
import Vendors from "./components/vendors/Vendors";
import AddVendor from "./components/vendors/AddVendor";
import EditSupplier from "./components/vendors/EditSupplier";
import Clients from "./components/clients/Clients";
import AddClient from "./components/clients/AddClient";
import EditClient from "./components/clients/EditClient";
import ShowClient from "./components/clients/ShowClient";
import Ratings from "./components/ratings/Ratings";
import BusinessSector from "./components/businessSector/BusinessSector";
import AddBusinessSector from "./components/businessSector/AddBusinessSector";
import EditBusinessSector from "./components/businessSector/EditBusinessSector";
import ShowBusinessSector from "./components/businessSector/ShowBusinessSector";
import BusinessSectorUsers from "./components/businessSector/BusinessSectorUsers";
import OfficialRecievingDocs from "./components/businessSector/OfficialRecievingDocs";
import BusinessSectorContracts from "./components/businessSector/BusinessSectorContracts";
import CreditLimit from "./components/businessSector/CreditLimit";
import BusinessDocs from "./components/businessSector/BusinessDocs";
import TripwayPartnersList from "./components/tripwayPartners/TripwayPartnersList";
import UsersWinchPartners from "./components/tripwayPartners/UsersWinchPartners";
import UserPermissions from "./components/tripwayPartners/UserPermissions";
import AddRole from "./components/tripwayPartners/AddRole";
import EditRole from "./components/tripwayPartners/EditRole";
import ClientsPartnersWinch from "./components/tripwayPartners/ClientsPartnersWinch";
import PartnersContracts from "./components/tripwayPartners/PartnersContracts";
import PartnersDocs from "./components/tripwayPartners/PartnersDocs";
import DocsCarriers from "./components/tripwayPartners/DocsCarriers";
import ExceededCommissionAccounts from "./components/serviceProviders/ExceededCommissionAccounts";
import Drivers from "./components/serviceProviders/Drivers";
import VehiclesPlural from "./components/serviceProviders/VehiclesPlural";
import AddProvider from "./components/serviceProviders/AddProvider";
import BankAccounts from "./components/bankAccounts/BankAccounts";
import Banks from "./components/bankAccounts/Banks";
import AddBank from "./components/bankAccounts/AddBank";
import EditBank from "./components/bankAccounts/EditBank";
import WithdrawalAndDeposit from "./components/withdrawalAndDeposit/WithdrawalAndDeposit";
import TripRequests from "./components/tripRequests/TripRequests";
import InternalRequests from "./components/tripRequests/InternalRequests";
import CompensationApprovals from "./components/tripRequests/CompensationApprovals";
import OrderIssueReports from "./components/tripRequests/OrderIssueReports";
import OrderDocumentReception from "./components/tripRequests/OrderDocumentReception";
import DocumentsAndFiles from "./components/tripRequests/DocumentsAndFiles";
import OrderSummary from "./components/tripRequests/OrderSummary";
import EditOrderDetails from "./components/tripRequests/EditOrderDetails";
import EditOrderPrices from "./components/tripRequests/EditOrderPrices";
import EditShipmentNumbers from "./components/tripRequests/EditShipmentNumbers";
import TripReports from "./components/tripRequests/TripReports";
import DuplicateShipmentNumbers from "./components/tripRequests/DuplicateShipmentNumbers";
import LateEntries from "./components/tripRequests/LateEntries";
import RentalRequests from "./components/mainRentals/RentalRequests";
import RentalProjects from "./components/mainRentals/RentalProjects";
import RentalContracts from "./components/mainRentals/RentalContracts";
import RentalRequestSummary from "./components/mainRentals/RentalRequestSummary";
import RentalReports from "./components/mainRentals/RentalReports";
import AddRentalContract from "./components/mainRentals/AddRentalContract";
import TransportDocuments from "./components/transportDocuments/TransportDocuments";
import PriceOfferRequests from "./components/priceOffers/PriceOfferRequests";
import ClientOffers from "./components/priceOffers/ClientOffers";
import ProviderOffers from "./components/priceOffers/ProviderOffers";
import Profits from "./components/reportsAndStatistics/Profits";
import MostRequestedServices from "./components/reportsAndStatistics/MostRequestedServices";
import ActiveAccounts from "./components/reportsAndStatistics/ActiveAccounts";
import Taxes from "./components/reportsAndStatistics/Taxes";
import TaxCalculation from "./components/reportsAndStatistics/TaxCalculation";
import NegativeAccounts from "./components/reportsAndStatistics/NegativeAccounts";
import LowestCostPrice from "./components/reportsAndStatistics/LowestCostPrice";
import DocumentReceptionReports from "./components/reportsAndStatistics/DocumentReceptionReports";
import AccountManagerRequestReports from "./components/reportsAndStatistics/AccountManagerRequestReports";
import OperatorTripReports from "./components/reportsAndStatistics/OperatorTripReports";
import TripRequestReport from "./components/reportsAndStatistics/TripRequestReport";
import PurchaseRequests from "./components/purchaseRequests/PurchaseRequests";
import InitialPurchaseRequests from "./components/purchaseRequests/InitialPurchaseRequests";
import Maintenance from "./components/fleetVehiclesManagement/Maintenance";
import Fuel from "./components/fleetVehiclesManagement/Fuel";
import VehicleStatement from "./components/fleetVehiclesManagement/vehicleStatement";
import SalesInvoices from "./components/invoicesAndDocuments/SalesInvoices";
import PurchaseInvoices from "./components/invoicesAndDocuments/PurchaseInvoices";
import Vouchers from "./components/invoicesAndDocuments/Vouchers";
import CustomerVouchers from "./components/invoicesAndDocuments/CustomerVouchers";
import InternalSales from "./components/internalInvoices/InternalSales";
import InternalPurchases from "./components/internalInvoices/InternalPurchases";
import InternalVouchers from "./components/internalInvoices/InternalVouchers";
import Archive from "./components/archive/Archive";
import Commissions from "./components/commissions/Commissions";
import CommissionReports from "./components/commissions/CommissionReports";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import VerifyCode from "./components/login/VerifyCode";
import ResetPassword from "./components/login/ResetPassword";
import { TitleProvider } from "./context/TitleContext";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile/Profile";
import Service_categories from "./components/Settings/service_categories/service_categories";
import AddServiceCategories from "./components/Settings/service_categories/add_service";
import EditServiceCategories from "./components/Settings/service_categories/edit_service";
import Compensation_categories from "./components/Settings/compenastionCategories/compensation_categories";
import Addcompensation_categories from "./components/Settings/compenastionCategories/add_compensation_categories";
import Editcompensation_categories from "./components/Settings/compenastionCategories/edit_compensation_categories";
import CompanyManagements from "./components/Settings/company_managements/CompanyManagements";
import AddManagement from "./components/Settings/company_managements/AddManagement";
import EditManagement from "./components/Settings/company_managements/EditManagement";
// import AddFleetRequest from "./components/Settings/fleetManagementTypes/AddFleetRequest";
import FleetManagementTypes from "./components/Settings/fleetManagementTypes/FleetManagementTypes";
import ShowCountries from "./components/Countries&Cities/countries/ShowCountries";
import EditCountries from "./components/Countries&Cities/countries/EditCountries";
import AddCountries from "./components/Countries&Cities/countries/AddCountries";
import AddRegion from "./components/Countries&Cities/Region/AddRegion";
import EditRegion from "./components/Countries&Cities/Region/EditRegion";
import ShowRegion from "./components/Countries&Cities/Region/ShowRegion";
import ShowCities from "./components/Countries&Cities/cities/ShowCities";
import EditCities from "./components/Countries&Cities/cities/EditCities";
import AddCities from "./components/Countries&Cities/cities/AddCities";
import ShowWinchCities from "./components/Countries&Cities/cities/ShowWinchCities";
import GoogleMapLinks from "./components/Settings/googleMapLinks/googleMapLinks";
import ShowPositions from "./components/Settings/positions/ShowPositions";
import AddPositions from "./components/Settings/positions/AddPositions";
import EditPositions from "./components/Settings/positions/EditPositions";
import ShowOffices from "./components/Settings/Offices/ShowOffices";
import AddOffices from "./components/Settings/Offices/AddOffices";
import EditOffices from "./components/Settings/Offices/EditOffices";
import AddFleetRequest from "./components/Settings/fleetManagementTypes/AddFleetRequest";
import EditFleetRequest from "./components/Settings/fleetManagementTypes/EditFleetRequest";
import FileArchiveTypes from "./components/Settings/fileArchiveTypes/FileArchiveTypes";
import AddFileArchiveTypes from "./components/Settings/fileArchiveTypes/AddFileArchiveTypes";
import EditFileArchiveTypes from "./components/Settings/fileArchiveTypes/EditFileArchiveTypes";
import VehicleCompanies from "./components/Settings/vehicleCompanies/VehicleCompanies";
import AddVehicleCompanies from "./components/Settings/vehicleCompanies/AddVehicleCompanies";
import EditVehicleCompanies from "./components/Settings/vehicleCompanies/EditVehicleCompanies";
import OrderIssueTypes from "./components/Settings/orderIssueTypes/OrderIssueTypes";
import AddOrderIssueTypes from "./components/Settings/orderIssueTypes/AddOrderIssueTypes";
import EditOrderIssueTypes from "./components/Settings/orderIssueTypes/EditOrderIssueTypes";
import ServicesTypes from "./components/Settings/ServicesTypes/ServicesTypes";
import AddServicesTypes from "./components/Settings/ServicesTypes/AddServicesTypes";
import EditServicesTypes from "./components/Settings/ServicesTypes/EditServicesTypes";
import QuotationFeatures from "./components/Settings/QuotationFeatures/QuotationFeatures";
import AddQuotationFeatures from "./components/Settings/QuotationFeatures/AddQuotationFeatures";
import EditQuotationFeatures from "./components/Settings/QuotationFeatures/EditQuotationFeatures";
import LoadTypes from "./components/Settings/LoadTypes/LoadTypes";
import AddLoadTypes from "./components/Settings/LoadTypes/AddLoadTypes";
import EditLoadTypes from "./components/Settings/LoadTypes/EditLoadTypes";
import GoodTypes from "./components/Settings/GoodTypes/GoodTypes";
import AddGoodTypes from "./components/Settings/GoodTypes/AddGoodTypes";
import EditGoodTypes from "./components/Settings/GoodTypes/EditGoodTypes";
import CarDepartments from "./components/CarDepartments/CarDepartments";
import AddCarDepartments from "./components/CarDepartments/AddCarDepartments";
import EditCarDepartments from "./components/CarDepartments/EditCarDepartments";
import MainSettings from "./components/Settings/MainSettings/MainSettings";
import AddJob from "./components/Settings/Jobs/AddJob";
import EditJob from "./components/Settings/Jobs/EditJob";
import OfficeDocumentType from "./components/Settings/OfficeDocumentType/OfficeDocumentType";
import AddOfficeDocType from "./components/Settings/OfficeDocumentType/AddOfficeDocType";
import EditOfficeDocType from "./components/Settings/OfficeDocumentType/EditOfficeDocType";
import DocumentType from "./components/Settings/DocumentType/DocumentType";
import AddDocumentType from "./components/Settings/DocumentType/AddDocumentType";
import EditDocumentType from "./components/Settings/DocumentType/EditDocumentType";
import AttachmentsType from "./components/Settings/AttachmentTypes/AttachmentsType";
import AddAttachments from "./components/Settings/AttachmentTypes/add_attachment";
import EditAttachments from "./components/Settings/AttachmentTypes/EditAttachments";
import JobCompanyManagements from "./components/Settings/Jobs/JobCompanyManagements";
import SalesAccounts from "./components/Settings/salesAccounts/SalesAccounts";
import AddSalesAccount from "./components/Settings/salesAccounts/AddSalesAccount";
import EditSalesAccount from "./components/Settings/salesAccounts/EditSalesAccount";
import SalesReturnsAccounts from "./components/Settings/SalesReturnsAccounts/SalesReturnsAccounts";
import AddSalesReturnsAccounts from "./components/Settings/SalesReturnsAccounts/AddSalesReturnsAccounts";
import EditSalesReturnsAccounts from "./components/Settings/SalesReturnsAccounts/EditSalesReturnsAccounts";

import RelatedPartyAccounts from "./components/Settings/RelatedPartyAccounts/RelatedPartyAccounts";
import AddRelatedPartyAccounts from "./components/Settings/RelatedPartyAccounts/AddRelatedPartyAccounts";
import EditRelatedPartyAccounts from "./components/Settings/RelatedPartyAccounts/EditRelatedPartyAccounts";

import PurchasesAccounts from "./components/Settings/PurchasesAccounts/PurchasesAccounts";
import AddPurchasesAccounts from "./components/Settings/PurchasesAccounts/AddPurchasesAccounts";
import EditPurchasesAccounts from "./components/Settings/PurchasesAccounts/EditPurchasesAccounts";

import PurchaseReturnsAccounts from "./components/Settings/PurchaseReturnsAccounts/PurchaseReturnsAccounts";
import AddPurchaseReturnsAccounts from "./components/Settings/PurchaseReturnsAccounts/AddPurchaseReturnsAccounts";
import EditPurchaseReturnsAccounts from "./components/Settings/PurchaseReturnsAccounts/EditPurchaseReturnsAccounts";

import Employees from "./components/employees/Employees";
import AddEmployees from "./components/employees/AddEmployees";
import ShowEmployee from "./components/employees/ShowEmployee";
import EditEmployee from "./components/employees/EditEmployee";
import Faqs from "./components/faqs/FAQs";
import AddFAQs from "./components/faqs/AddFAQs";
import EditFAQs from "./components/faqs/EditFAQs";
import FurnitureQuestions from "./components/Settings/FurnitureQuestions/FurnitureQuestions";
import AddFurnitureQuestions from "./components/Settings/FurnitureQuestions/AddFurnitureQuestions";
import EditFurnitureQuestions from "./components/Settings/FurnitureQuestions/EditFurnitureQuestions";
import CategoryRushHours from "./components/Settings/CategoryRushHours/CategoryRushHours";
import EditCategoryRushHours from "./components/Settings/CategoryRushHours/EditCategoryRushHours";
import ChartOfAccounts from "./components/accounting/ChartOfAccounts/ChartOfAccounts";
import AddChartOfAccounts from "./components/accounting/ChartOfAccounts/AddChartOfAccounts";
import EditChartOfAccounts from "./components/accounting/ChartOfAccounts/EditChartOfAccounts";
import ShowChartOfAccounts from "./components/accounting/ChartOfAccounts/ShowChartOfAccounts";

import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <>
      <TitleProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />

              <Route
                path="business_sector/users"
                element={<BusinessSectorUsers />}
              />
              <Route
                path="business_sector/official_recieving_docs"
                element={<OfficialRecievingDocs />}
              />
              <Route
                path="business_sector/contracts"
                element={<BusinessSectorContracts />}
              />
              <Route
                path="business_sector/credit_limit"
                element={<CreditLimit />}
              />
              <Route
                path="business_sector/business_docs"
                element={<BusinessDocs />}
              />
              <Route
                path="tripway_partners_list"
                element={<TripwayPartnersList />}
              />
              <Route
                path="users_winch_partners"
                element={<UsersWinchPartners />}
              />

              <Route
                path="clients_partners_winch"
                element={<ClientsPartnersWinch />}
              />
              <Route
                path="partners_contracts"
                element={<PartnersContracts />}
              />
              <Route path="partners_docs" element={<PartnersDocs />} />
              <Route path="docs_carriers" element={<DocsCarriers />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="drivers/add_provider" element={<AddProvider />} />
              <Route path="vehicles_plural" element={<VehiclesPlural />} />

              <Route
                path="exceeded_commission_accounts"
                element={<ExceededCommissionAccounts />}
              />
              <Route path="bank_accounts" element={<BankAccounts />} />
              <Route path="banks" element={<Banks />} />
              <Route path="add_bank" element={<AddBank />} />
              <Route path="edit_bank/:id" element={<EditBank />} />
              <Route
                path="withdrawal_deposit"
                element={<WithdrawalAndDeposit />}
              />
              <Route path="trip_requests" element={<TripRequests />} />
              <Route path="internal_requests" element={<InternalRequests />} />
              <Route
                path="compensation_approvals"
                element={<CompensationApprovals />}
              />
              <Route
                path="order_issue_reports"
                element={<OrderIssueReports />}
              />
              <Route
                path="order_document_reception"
                element={<OrderDocumentReception />}
              />
              <Route path="documents_files" element={<DocumentsAndFiles />} />
              <Route path="order_summary" element={<OrderSummary />} />
              <Route path="edit_order_details" element={<EditOrderDetails />} />
              <Route path="edit_order_prices" element={<EditOrderPrices />} />
              <Route
                path="edit_shipment_numbers"
                element={<EditShipmentNumbers />}
              />
              <Route path="trip_reports" element={<TripReports />} />
              <Route
                path="duplicate_shipment_numbers"
                element={<DuplicateShipmentNumbers />}
              />
              <Route path="late_entries" element={<LateEntries />} />
              <Route path="rental_requests" element={<RentalRequests />} />
              <Route path="rental_projects" element={<RentalProjects />} />
              <Route path="rental_contracts" element={<RentalContracts />} />
              <Route
                path="rental_request_summary"
                element={<RentalRequestSummary />}
              />
              <Route path="rental_reports" element={<RentalReports />} />
              <Route
                path="rental_contracts/add_rental_contract"
                element={<AddRentalContract />}
              />
              <Route
                path="transport_documents"
                element={<TransportDocuments />}
              />
              <Route
                path="price_offer_requests"
                element={<PriceOfferRequests />}
              />
              <Route path="client_offers" element={<ClientOffers />} />
              <Route path="provider_offers" element={<ProviderOffers />} />
              <Route path="profits" element={<Profits />} />
              <Route
                path="most_requested_services"
                element={<MostRequestedServices />}
              />
              <Route path="active_accounts" element={<ActiveAccounts />} />
              <Route path="taxes" element={<Taxes />} />
              <Route path="tax_calculation" element={<TaxCalculation />} />
              <Route path="negative_accounts" element={<NegativeAccounts />} />
              <Route path="lowest_cost_price" element={<LowestCostPrice />} />
              <Route
                path="document_reception_reports"
                element={<DocumentReceptionReports />}
              />
              <Route
                path="account_manager_request_reports"
                element={<AccountManagerRequestReports />}
              />
              <Route
                path="operator_trip_reports"
                element={<OperatorTripReports />}
              />
              <Route
                path="trip_request_report"
                element={<TripRequestReport />}
              />
              <Route path="purchase_requests" element={<PurchaseRequests />} />
              <Route
                path="initial_purchase_requests"
                element={<InitialPurchaseRequests />}
              />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="fuel" element={<Fuel />} />
              <Route path="vehicle_statement" element={<VehicleStatement />} />
              <Route path="sales_invoices" element={<SalesInvoices />} />
              <Route path="purchase_invoices" element={<PurchaseInvoices />} />
              <Route path="vouchers" element={<Vouchers />} />
              <Route path="customer_vouchers" element={<CustomerVouchers />} />
              <Route path="internal_sales" element={<InternalSales />} />
              <Route
                path="internal_purchases"
                element={<InternalPurchases />}
              />
              <Route path="internal_vouchers" element={<InternalVouchers />} />
              <Route path="archive" element={<Archive />} />
              <Route path="commissions" element={<Commissions />} />
              <Route
                path="commission_reports"
                element={<CommissionReports />}
              />
              
              <Route
                path="business_sector/users"
                element={<BusinessSectorUsers />}
              />
              <Route
                path="business_sector/official_recieving_docs"
                element={<OfficialRecievingDocs />}
              />
              <Route
                path="business_sector/contracts"
                element={<BusinessSectorContracts />}
              />
              <Route
                path="business_sector/credit_limit"
                element={<CreditLimit />}
              />
              <Route
                path="business_sector/business_docs"
                element={<BusinessDocs />}
              />
              <Route
                path="tripway_partners_list"
                element={<TripwayPartnersList />}
              />
              <Route
                path="users_winch_partners"
                element={<UsersWinchPartners />}
              />

              <Route
                path="clients_partners_winch"
                element={<ClientsPartnersWinch />}
              />
              <Route
                path="partners_contracts"
                element={<PartnersContracts />}
              />
              <Route path="partners_docs" element={<PartnersDocs />} />
              <Route path="docs_carriers" element={<DocsCarriers />} />
              <Route path="drivers" element={<Drivers />} />
              <Route path="drivers/add_provider" element={<AddProvider />} />
              <Route path="vehicles_plural" element={<VehiclesPlural />} />
              <Route
                path="exceeded_commission_accounts"
                element={<ExceededCommissionAccounts />}
              />
              <Route path="bank_accounts" element={<BankAccounts />} />
              <Route path="banks" element={<Banks />} />
              <Route
                path="withdrawal_deposit"
                element={<WithdrawalAndDeposit />}
              />
              <Route path="trip_requests" element={<TripRequests />} />
              <Route path="internal_requests" element={<InternalRequests />} />
              <Route
                path="compensation_approvals"
                element={<CompensationApprovals />}
              />
              <Route
                path="order_issue_reports"
                element={<OrderIssueReports />}
              />
              <Route
                path="order_document_reception"
                element={<OrderDocumentReception />}
              />
              <Route path="documents_files" element={<DocumentsAndFiles />} />
              <Route path="order_summary" element={<OrderSummary />} />
              <Route path="edit_order_details" element={<EditOrderDetails />} />
              <Route path="edit_order_prices" element={<EditOrderPrices />} />
              <Route
                path="edit_shipment_numbers"
                element={<EditShipmentNumbers />}
              />
              <Route path="trip_reports" element={<TripReports />} />
              <Route
                path="duplicate_shipment_numbers"
                element={<DuplicateShipmentNumbers />}
              />
              <Route path="late_entries" element={<LateEntries />} />
              <Route path="rental_requests" element={<RentalRequests />} />
              <Route path="rental_projects" element={<RentalProjects />} />
              <Route path="rental_contracts" element={<RentalContracts />} />
              <Route
                path="rental_request_summary"
                element={<RentalRequestSummary />}
              />
              <Route path="rental_reports" element={<RentalReports />} />
              <Route
                path="rental_contracts/add_rental_contract"
                element={<AddRentalContract />}
              />
              <Route
                path="transport_documents"
                element={<TransportDocuments />}
              />
              <Route
                path="price_offer_requests"
                element={<PriceOfferRequests />}
              />
              <Route path="client_offers" element={<ClientOffers />} />
              <Route path="provider_offers" element={<ProviderOffers />} />
              <Route path="profits" element={<Profits />} />
              <Route
                path="most_requested_services"
                element={<MostRequestedServices />}
              />
              <Route path="active_accounts" element={<ActiveAccounts />} />
              <Route path="taxes" element={<Taxes />} />
              <Route path="tax_calculation" element={<TaxCalculation />} />
              <Route path="negative_accounts" element={<NegativeAccounts />} />
              <Route path="lowest_cost_price" element={<LowestCostPrice />} />
              <Route
                path="document_reception_reports"
                element={<DocumentReceptionReports />}
              />
              <Route
                path="account_manager_request_reports"
                element={<AccountManagerRequestReports />}
              />
              <Route
                path="operator_trip_reports"
                element={<OperatorTripReports />}
              />
              <Route
                path="trip_request_report"
                element={<TripRequestReport />}
              />
              <Route path="purchase_requests" element={<PurchaseRequests />} />
              <Route
                path="initial_purchase_requests"
                element={<InitialPurchaseRequests />}
              />
              <Route path="maintenance" element={<Maintenance />} />
              <Route path="fuel" element={<Fuel />} />
              <Route path="vehicle_statement" element={<VehicleStatement />} />
              <Route path="sales_invoices" element={<SalesInvoices />} />
              <Route path="purchase_invoices" element={<PurchaseInvoices />} />
              <Route path="vouchers" element={<Vouchers />} />
              <Route path="customer_vouchers" element={<CustomerVouchers />} />
              <Route path="internal_sales" element={<InternalSales />} />
              <Route
                path="internal_purchases"
                element={<InternalPurchases />}
              />
              <Route path="internal_vouchers" element={<InternalVouchers />} />
              <Route path="archive" element={<Archive />} />
              <Route path="commissions" element={<Commissions />} />
              <Route
                path="commission_reports"
                element={<CommissionReports />}
              />
              <Route
                path="add_purchases_accounts"
                element={<AddPurchasesAccounts />}
              />
              <Route
                path="edit_purchases_accounts/:id"
                element={<EditPurchasesAccounts />}
              />
              <Route
                path="purchases_accounts"
                element={<PurchasesAccounts />}
              />

              <Route
                path="purchase_returns_accounts"
                element={<PurchaseReturnsAccounts />}
              />
              <Route
                path="add_purchase_returns_accounts"
                element={<AddPurchaseReturnsAccounts />}
              />
              <Route
                path="edit_purchase_returns_accounts/:id"
                element={<EditPurchaseReturnsAccounts />}
              />

              <Route
                path="related_party_accounts"
                element={<RelatedPartyAccounts />}
              />
              <Route
                path="add_related_party_accounts"
                element={<AddRelatedPartyAccounts />}
              />
              <Route
                path="edit_related_party_accounts/:id"
                element={<EditRelatedPartyAccounts />}
              />

              <Route
                path="sales_returns_accounts"
                element={<SalesReturnsAccounts />}
              />
              <Route
                path="add_sales_returns_accounts"
                element={<AddSalesReturnsAccounts />}
              />
              <Route
                path="edit_sales_returns_accounts/:id"
                element={<EditSalesReturnsAccounts />}
              />

              <Route path="sales_accounts" element={<SalesAccounts />} />
              <Route path="add_sales_account" element={<AddSalesAccount />} />
              <Route
                path="edit_sales_account/:id"
                element={<EditSalesAccount />}
              />

              <Route path="favourites" element={<Favourites />} />

              <Route path="branches" element={<Branches />} />
              <Route path="branches/edit_branch/:id" element={<EditBranch />} />
              <Route path="branches/view_branch/:id" element={<ViewBranch />} />

              <Route path="vendors" element={<Vendors />} />
              <Route path="vendors/add_vendor" element={<AddVendor />} />
              <Route
                path="vendors/edit_supplier/:id"
                element={<EditSupplier />}
              />

              <Route path="ratings" element={<Ratings />} />

              <Route path="user_permissions" element={<UserPermissions />} />
              <Route path="add_role" element={<AddRole />} />
              <Route path="edit_role/:id" element={<EditRole />} />

              <Route
                path="job_company_managements"
                element={<JobCompanyManagements />}
              />
              <Route path="job_company_managements/add" element={<AddJob />} />
              <Route
                path="job_company_managements/edit/:id"
                element={<EditJob />}
              />

              <Route path="export_orders" element={<ExportOrders />} />
              <Route path="profile" element={<Profile />} />
              {/* tripway done pages */}
              <Route path="business_sector" element={<BusinessSector />} />
              <Route
                path="business_sector/add"
                element={<AddBusinessSector />}
              />
              <Route
                path="business_sector/edit/:id"
                element={<EditBusinessSector />}
              />
              <Route
                path="business_sector/view/:id"
                element={<ShowBusinessSector />}
              />
              <Route path="employees" element={<Employees />} />
              <Route path="add_employees" element={<AddEmployees />} />
              <Route path="show_employee/:id" element={<ShowEmployee />} />
              <Route path="edit_employee/:id" element={<EditEmployee />} />
              <Route path="cities" element={<ShowCities />} />
              <Route path="cities/winch" element={<ShowWinchCities />} />
              <Route path="cities/add_city" element={<AddCities />} />
              <Route path="cities/edit_city/:id" element={<EditCities />} />
              <Route path="countries" element={<ShowCountries />} />
              <Route
                path="countries/edit_country/:id"
                element={<EditCountries />}
              />
              <Route path="countries/add_country" element={<AddCountries />} />
              <Route path="region" element={<ShowRegion />} />
              <Route path="region/edit_region/:id" element={<EditRegion />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="vendors/add_vendor" element={<AddVendor />} />
              <Route
                path="vendors/edit_supplier/:id"
                element={<EditSupplier />}
              />
              <Route path="faqs" element={<Faqs />} />
              <Route path="add_faqs" element={<AddFAQs />} />
              <Route path="edit_faqs/:id" element={<EditFAQs />} />
              <Route path="clients" element={<Clients />} />
              <Route path="clients/add_client" element={<AddClient />} />
              <Route path="clients/edit_client/:id" element={<EditClient />} />
              <Route path="clients/show_client/:id" element={<ShowClient />} />

              <Route path="file_archive_types" element={<FileArchiveTypes />} />
              <Route
                path="add_file_archive_types"
                element={<AddFileArchiveTypes />}
              />
              <Route
                path="edit_file_archive_types/:id"
                element={<EditFileArchiveTypes />}
              />

              <Route path="order_issue_types" element={<OrderIssueTypes />} />
              <Route
                path="add_order_issue_types"
                element={<AddOrderIssueTypes />}
              />
              <Route
                path="edit_order_issue_types/:id"
                element={<EditOrderIssueTypes />}
              />
              <Route path="services_types" element={<ServicesTypes />} />
              <Route
                path="add_services_types"
                element={<AddServicesTypes />}
              />
              <Route
                path="edit_services_types/:id"
                element={<EditServicesTypes />}
              />
              <Route path="quotation_features" element={<QuotationFeatures />} />
              <Route
                path="add_quotation_features"
                element={<AddQuotationFeatures />}
              />
              <Route
                path="edit_quotation_features/:id"
                element={<EditQuotationFeatures />}
              />
              <Route path="load_types" element={<LoadTypes />} />
              <Route
                path="add_load_types"
                element={<AddLoadTypes />}
              />
              <Route
                path="edit_load_types/:id"
                element={<EditLoadTypes />}
              />
              <Route path="good_types" element={<GoodTypes />} />
              <Route
                path="add_good_types"
                element={<AddGoodTypes />}
              />
              <Route
                path="edit_good_types/:id"
                element={<EditGoodTypes />}
              />
              <Route path="car_departments" element={<CarDepartments />} />
              <Route
                path="add_car_department"
                element={<AddCarDepartments />}
              />
              <Route
                path="edit_car_department/:id"
                element={<EditCarDepartments />}
              />
              
              <Route
                path="main_settings"
                element={<MainSettings />}
              />
              <Route path="furniture_questions" element={<FurnitureQuestions />} />
              <Route
                path="add_furniture_questions"
                element={<AddFurnitureQuestions />}
              />
              <Route
                path="edit_furniture_questions/:id"
                element={<EditFurnitureQuestions />}
              />
              <Route path="document_type" element={<DocumentType />} />
              <Route path="add_document_type" element={<AddDocumentType />} />
              <Route
                path="edit_document_type/:id"
                element={<EditDocumentType />}
              />
              <Route
                path="category_rush_hours"
                element={<CategoryRushHours />}
              />
              <Route
                path="edit_category_rush_hours/:id"
                element={<EditCategoryRushHours />}
              />
               <Route
                path="fleet_management_types"
                element={<FleetManagementTypes />}
              />
              <Route
                path="add_fleet_request_type"
                element={<AddFleetRequest />}
              />
              <Route
                path="edit_fleet_request_type/:id"
                element={<EditFleetRequest />}
              />
              <Route
                path="office_document_type"
                element={<OfficeDocumentType />}
              />
              <Route
                path="office_document_type/add"
                element={<AddOfficeDocType />}
              />
              <Route
                path="office_document_type/edit/:id"
                element={<EditOfficeDocType />}
              />
               <Route
                path="service_categories"
                element={<Service_categories />}
              />
              <Route
                path="services_categories/create"
                element={<AddServiceCategories />}
              />
              <Route
                path="services_categories/edit/:id"
                element={<EditServiceCategories />}
              />
              <Route
                path="compensation_categories"
                element={<Compensation_categories />}
              />
              <Route
                path="compensation_categories/create"
                element={<Addcompensation_categories />}
              />
              <Route
                path="compensation_categories/edit/:id"
                element={<Editcompensation_categories />}
              />
              
              <Route path="vehicle_companies" element={<VehicleCompanies />} />
              <Route
                path="add_vehicle_companies"
                element={<AddVehicleCompanies />}
              />
              <Route
                path="edit_vehicle_companies/:id"
                element={<EditVehicleCompanies />}
              />

              <Route
                path="company_managements"
                element={<CompanyManagements />}
              />
              <Route
                path="company_managements/add_management"
                element={<AddManagement />}
              />
              <Route
                path="company_managements/edit_managemnet/:id"
                element={<EditManagement />}
              />
              <Route path="edit_GoogleMapLinks" element={<GoogleMapLinks />} />

              <Route path="Positions" element={<ShowPositions />} />
              <Route path="Positions/add_position" element={<AddPositions />} />
              <Route
                path="Positions/edit_position/:id"
                element={<EditPositions />}
              />

              <Route path="AttachmentsType" element={<AttachmentsType />} />
              <Route
                path="AttachmentsType/add_attachment"
                element={<AddAttachments />}
              />
              <Route
                path="AttachmentsType/edit_attachment/:id"
                element={<EditAttachments />}
              />
              <Route path="Offices" element={<ShowOffices />} />
              <Route path="Offices/add_office" element={<AddOffices />} />
              <Route path="Offices/edit_office/:id" element={<EditOffices />} />
              <Route path="chart_of_accounts" element={<ChartOfAccounts />} />
              <Route path="add_chart_accounts" element={<AddChartOfAccounts />} />
              <Route path="edit_chart_accounts/:id" element={<EditChartOfAccounts />} />
              <Route path="show_chart_accounts/:id" element={<ShowChartOfAccounts />} />
            </Route>
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="verify_code" element={<VerifyCode />} />
            <Route path="reset_password" element={<ResetPassword />} />
            {/* catch all route for unknown paths */}
            <Route path="*" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer position="top-right" autoClose={1000} />
      </TitleProvider>
    </>
  );
}

export default App;
