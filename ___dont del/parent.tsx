import * as React from "react";
import { AppContext, AppState, UserProfileData } from "../../../MainApp";
import { gap, padding, DownloadFile, AssignmentStatus, GetDate, ConvertDateByLocale, isEven, } from "../../../../../shared/localization/Helper";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS, da, de } from "date-fns/locale";
import { Topic, TopicStatus, defaultTopic } from "../../../../models/Topic";
import { HueSlider as HSlider, SaturationSlider, LightnessSlider, AlphaSlider } from 'react-slider-color-picker'
import { Dropdown, DropdownItemProps, Button, Input, Text, Flex, Icon, List, Dialog, ListProps, Attachment, Segment } from '@fluentui/react-northstar';
import { MapDataToDropdownItem } from "shared/utils/DropdownItem";
import Alerts, { AlertType, alertValue, ShowAlert } from "../../../Alerts";
import { Strings } from "shared/localization/strings";
import CancelConfirmation from "shared/components/PopupDialog/CancelConfirmation";
import { TitleComponent } from "shared/components/Title/Title";
import { ClassSelect } from "../../Assignment/Popup/AssignmentEdit/ClassSelect";
import { Classes, ClassIdWithName } from "src/projects/models/Class";
import { Editor } from "shared/components/Description/Editor";
import Resources from "shared/components/Resources/Resources";
import { AttachedResources } from "../../../../../shared/components/Resources/AttachedResources";
import { Files } from "src/projects/models/FileList";
import { HandleShowTopicFile, HandleDates, SaveTopic, CheckValidations, DeleteAttachment, GetLessonEventsByClassId, getAllRequiredLessons, GetAssignmentsByTopic, deleteTopicMessage, fillExistingTopic, TopicDate } from "./TopicHelper";
import ConfirmationBox from "shared/components/PopupDialog/ConfirmationDialog";
import { HeaderAction } from "../../Common/HeaderMenu";
import { Events } from "src/projects/models/Events";
import { Homework, ClassWithHomeWork, TopicHomework, } from "src/projects/models/Homework";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { AssignmentInterface } from "src/projects/models/Assignment";
import { GetSmallDateFormat } from "../../Assignment/AssignmentHelper";
import { datePickerPosition, datePickerPlacement } from "shared/Theme";
import Draggable from "react-draggable";
import Notifications, { notify } from "react-notify-toast";
import { AllClasses } from "../../Assignment/Popup/AllClasses";
import { GetSearchPreferencesFor } from "../../Common/Filter/FilterHelper";
import { getDaysDiff } from "../../StudyPlan/StudyPlanUtil";
import { isAccessTokenExpired, isAccessTokenRenewing, } from "../../Authentication/AuthHelper";
import SilentTokenRefresh from "../../Authentication/HiddenIframeTokenRefresh";
import { EditorColorPicker } from 'shared/components/Description/EditorColorPicker';
import { AddTopicMetrial } from "./AddTopicMetrial";
import { PublishDraftFeedback } from 'src/projects/teacher/Components/Assignment/AssignmentApi';

registerLocale("en", enUS);
registerLocale("da", da);
registerLocale("de", de);

interface Props {
	showPopUp?: boolean;
	isFromTeams?: boolean;
	OnClosePopUp?: () => void;
	Topic: Topic;
	UpdateTopicList?: (topic) => void;
	user?: UserProfileData;
	appContext: AppState;
	Classes: Classes[];
	UserPreferredClasses?: ClassIdWithName[];
}


interface State {
	cancelConfirmation?: boolean;
	topic?: Topic;
	isTopicConfirm?: boolean;
	previousClassId?: string;
	startUploadingFiles?: boolean;
	confirmFileDelete?: boolean;
	fileDeletionLoader: boolean;
	saveTopicLoader: boolean;
	lessonLoader?: boolean;
	assignmentLoader?: boolean;

	topicAssignments?: AssignmentInterface[];
	topicHomeWorks?: Homework[];
	selectedAssignment: AssignmentInterface;
	selectedHomeWork: Homework;
	isDeleteTopicConfirmationPopup: boolean;
	deleteLoader: boolean;
	matchTopic?: Topic;
	refClassId: string;
	refId: string;
	isShowMergeConfirmPopUp?: boolean;
	activeDrags: number;
	isCopy: boolean;
	showAllClasses?: boolean;
	filesToAdd: Files[];
	isTokenRenewing: boolean;
	showMaterialDialog: boolean

}
interface deepCopy {
	defaultTopicValues: string;
	classes: string;
	appState: string;
}
let deepCopy: deepCopy = {
	appState: "",
	classes: "",
	defaultTopicValues: "",
};
type MaterialType = "Primary" | "Secondary"

class AddNewTopic extends React.Component<Props, State> {
	isPropsChanged: boolean;
	status: string;
	tempFile: string;
	nameOfFile: string;
	topicStatus: string;
	_primaryFilename = [];
	_secondaryFilename = [];
	material: MaterialType;


	constructor(props: Props) {
		super(props);
		deepCopy.defaultTopicValues = JSON.stringify(defaultTopic);
		deepCopy.classes = JSON.stringify(this.props.Classes);
		deepCopy.appState = JSON.stringify(this.props.appContext.classes);

		this.state = {
			cancelConfirmation: false,
			previousClassId: "",
			isTopicConfirm: false,
			startUploadingFiles: null,
			topic: this.props.Topic
				? JSON.parse(JSON.stringify(this.props.Topic))
				: JSON.parse(deepCopy.defaultTopicValues),
			confirmFileDelete: false,
			fileDeletionLoader: false,
			saveTopicLoader: false,
			lessonLoader: false,
			topicAssignments: [],
			topicHomeWorks: [],
			assignmentLoader: false,
			isDeleteTopicConfirmationPopup: false,
			deleteLoader: false,
			matchTopic: defaultTopic,
			isShowMergeConfirmPopUp: false,
			activeDrags: 0,
			isCopy: false,
			refClassId: "",
			refId: "",
			showAllClasses: false,
			filesToAdd: [],
			isTokenRenewing: false,
			selectedAssignment: undefined,
			selectedHomeWork: undefined,
			showMaterialDialog: false
			// {h: 180, s: 100, l: 50, a: 1}
		};
		this._primaryFilename = [];
		this._secondaryFilename = [];



		this.HandleClose = this.HandleClose.bind(this);
		this.setallClassPopupState = this.setallClassPopupState.bind(this);
		this.onShare = this.onShare.bind(this);
	}



	AddDocumentsToTopic = (docs) => {
		this.setState({
			topic: Object.assign({}, this.state.topic, { attachments: docs }),
			confirmFileDelete: false,
			fileDeletionLoader: false,
		});
		this.tempFile = "";
	};
	BindDates(value, field) {
		const { topic } = this.state;
		if (field == "startDate" && topic.endDate !== "") {
			const diff = getDaysDiff(value, new Date(topic.endDate), false);
			if (diff == 0) {
				let day = 60 * 60 * 24 * 1000;
				topic.endDate = new Date(
					new Date(topic.endDate).getTime() + day
				).toString();
			}
			if (value !== topic.startDate) {
				this.fetchAssignmentHomeWorkData(topic.classId, TopicDate(value), topic.endDate, topic.id);
			}
		}
		else if (field == "endDate" && topic.startDate !== "") {
			if (value !== topic.startDate) {
				this.fetchAssignmentHomeWorkData(topic.classId, topic.startDate, TopicDate(value), topic.id);
			}

		}
		this.setState({ topic: HandleDates(value, field, topic) });
		this.isPropsChanged = true;
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.topic !== this.state.topic) {
			this.isPropsChanged = true;
			CheckValidations(this.state.topic);
		}
	}
	async componentDidMount() {
		const { topic } = this.state;
		const { user, appContext } = this.props;
		if (topic.id)
			this.fetchAssignmentHomeWorkData(topic.classId, topic.startDate, topic.endDate, topic.id);
		this.topicStatus =
			topic.topicStatus === TopicStatus.published ? "publish" : "draft";
	}

	DeleteDocument(file) {
		if (!file.id) {
			this.nameOfFile = "";
			const docs = this.state.topic.attachments;
			const i = docs.findIndex((x: any) => x.name === file.name);
			docs.splice(i, 1);
			this.AddDocumentsToTopic(docs);
		} else {
			this.tempFile = file;
			//  this.setState({ confirmFileDelete: true });
			const docs = this.state.topic.attachments;
			const i = docs.findIndex((x: any) => x.id === file.id);
			docs.splice(i, 1);
			this.AddDocumentsToTopic(docs);
		}
	}
	HandleClose = () => {
		alertValue.show = false;
		this.forceUpdate();
	};
	HandleTopicConfirmation = (isConfirm: boolean) => {
		this.setState({ isTopicConfirm: isConfirm });
	};
	HandleTopicMerge = (isConfirm: boolean) => {
		this.setState({ isShowMergeConfirmPopUp: isConfirm });
	};
	StartUpload(startUpload: boolean) {
		const { topic } = this.state;
		const filesToAdd: Files[] = [];
		topic.attachments.forEach((att) => {
			if (!att.id) {
				filesToAdd.push(att);
			}
		});
		this.setState({
			startUploadingFiles: startUpload,
			saveTopicLoader: startUpload,
			filesToAdd,
		});
	}

	fetchAssignmentHomeWorkData(classId: string, topicStartData: string, topicEndData: string, Id: string) {
		if (classId && classId.length > 0 && topicStartData && topicStartData.length > 0 && topicEndData && topicEndData.length) {
			const { user, appContext } = this.props;
			const topic: Topic = JSON.parse(deepCopy.defaultTopicValues)
			topic.id = Id; topic.startDate = topicStartData; topic.endDate = topicEndData; topic.channelid = Id.length > 0 ? Id : "0"
			topic.classId = classId

			const isTokenExpired = isAccessTokenExpired(appContext.contextUPN);
			this.setState({
				lessonLoader: true,
				assignmentLoader: true,
				isTokenRenewing: isTokenExpired,
			});
			isAccessTokenRenewing(isTokenExpired).then(() => {
				this.setState({ isTokenRenewing: false });
				GetAssignmentsByTopic(topic)
					.then((res) => {

						if (res) {
							this.setState({
								assignmentLoader: false,
								lessonLoader: false,
								topicAssignments: res["assignments"],
								topicHomeWorks: res["homeworks"]
							});

						}
					})
					.catch((err) => {

						this.setState({ assignmentLoader: false, lessonLoader: false, }, () => {
							throw new Error(err);
						});
					});
			});

		}


	}

	HandleChange(event) {
		let previousClassId: string;
		const { topic } = this.state;
		if (
			event.target.name === "classId" &&
			this.state.topic.classId !== event.target.value
		) {

			previousClassId = this.state.topic.classId;
			this.fetchAssignmentHomeWorkData(event.target.value, topic.startDate, topic.endDate, topic.id)
		}
		if (
			event.target.name === "classId" &&
			this.state.topic.classId === event.target.value
		) {
			previousClassId = "";
		}
		this.setState({
			topic: Object.assign({}, this.state.topic, {
				[event.target.name]: event.target.value,
			}),
			previousClassId,
		});
	}
	HandleSubmit(trans: Strings) {

		this.trimTitle();

		const filterTopic = this.filterExistingTopic();
		if (filterTopic && this.state.topic.id) {
			ShowAlert(AlertType.danger, trans.errorTopicOnSameDate);
			this.forceUpdate();
			return false;
		}
		if (filterTopic) {
			let filltopic = JSON.parse(deepCopy.defaultTopicValues);
			let topic = fillExistingTopic(filterTopic, filltopic);
			topic.classId = topic.classId = this.state.topic.classId;
			this.setState({ matchTopic: topic });
			this.HandleTopicMerge(true);
			return false;
		}
		this.topicStatus = TopicStatus.published.toString();
		this.setTopicStatus(TopicStatus.published);
		this.HandleTopicConfirmation(true);
	}

	setTopicStatus = (topicStatus: TopicStatus) => {
		const { topic } = this.state;
		topic.topicStatus = topicStatus;
		this.setState({ topic });
	};

	trimTitle = () => {
		const { topic } = this.state;
		topic.title = topic.title.trim();
		this.setState({ topic });
	};

	HandleEditorChange(content, source, from) {
		if (source === "user") {
			if (content && from) {
				this.setState({
					topic: Object.assign({}, this.state.topic, { [from]: content }),
				});
			}
		}
	}
	SaveDraft(trans: Strings) {

		this.trimTitle();

		const variations = {
			title: this.state.topic.title.trim() === "",
			class:
				(!this.state.topic.classId || this.state.topic.classId === "0") && true,
		};
		if (variations.title && variations.class) {
			ShowAlert(AlertType.danger, trans.pleaseSelect + " " + trans.title.toLowerCase() + trans.and + " " + trans.class.toLowerCase());
			this.forceUpdate();
			return false;
		}
		if (variations.title || variations.class) {
			ShowAlert(AlertType.danger, trans.pleaseSelect + " " + (variations.title ? trans.title.toLowerCase() : variations.class ? trans.class.toLowerCase() : ""));
			this.forceUpdate();
			return false;
		}
		const filtertopic = this.filterExistingTopic();
		if (filtertopic && this.state.topic.id) {
			ShowAlert(AlertType.danger, trans.errorTopicOnSameDate);
			this.forceUpdate();
			return false;
		}
		if (filtertopic) {
			let filltopic = JSON.parse(deepCopy.defaultTopicValues);
			let topic = fillExistingTopic(filtertopic, filltopic);
			topic.classId = topic.classId = this.state.topic.classId;
			this.setState({ matchTopic: topic });
			this.HandleTopicMerge(true);
			return false;
		}

		this.topicStatus = TopicStatus.draft.toString();
		this.setTopicStatus(TopicStatus.draft);
		this.StartUpload(true);
	}
	changeState(topic: Topic) {
		this.setState({ topic });
	}
	getDateOnly(date: string) {
		const d = new Date(date);
		return new Date(d.setHours(0, 0, 0, 0)).getTime();
	}
	filterExistingTopic() {
		const startDate = this.getDateOnly(this.state.topic.startDate);
		const endDate = this.getDateOnly(this.state.topic.endDate);
		let filtertopic;
		let filerclass = JSON.parse(deepCopy.classes).find((element) => {
			return element.id === this.state.topic.classId;
		});

		if (filerclass) {
			if (filerclass.topics && filerclass.topics.length > 0) {
				filerclass.topics.forEach((topic) => {
					const sDate = this.getDateOnly(topic.startDate);
					const eDate = this.getDateOnly(topic.endDate);
					if (sDate === startDate && eDate === endDate) {
						filtertopic = topic;
					}
				});
			}
		}

		if (!filtertopic && !this.state.isCopy) {
			filerclass = JSON.parse(deepCopy.appState).find((element) => {
				return element.id === this.state.topic.classId;
			});
			if (filerclass) {
				if (filerclass.topics && filerclass.topics.length > 0) {
					filerclass.topics.forEach((topic) => {
						const sDate = this.getDateOnly(topic.startDate);
						const eDate = this.getDateOnly(topic.endDate);
						if (sDate === startDate && eDate === endDate) {
							filtertopic = topic;
						}
					});
				}
			}
		}
		if (this.state.topic && filtertopic && this.state.topic.id === filtertopic.id)
			return null;
		return filtertopic;
	}



	onCopy = () => {
		let topic = this.state.topic;
		topic.isViewMode = false;
		const refId = topic.id;
		const refClassId = topic.classId;
		topic.id = "";
		topic.classId = "";
		topic.isTopicFolderCreated = false;
		topic.topicDirectory = null;
		topic.topicStatus = TopicStatus.draft;
		this.topicStatus = TopicStatus.draft.toString();
		topic.attachments = topic.attachments.filter(
			(t) => t.resourceType !== "OneNote"
		);

		this.setState({
			topic,
			isCopy: true,

			topicAssignments: [],
			refId,
			refClassId,
		});
	};
	onShare = () => {
		this.setallClassPopupState(true);
	};

	handleClickToDownloadFile = (
		file: Files,
		downloadCompleted: string,
		failtoDownload,
		classId
	) => {
		const { appContext } = this.props;
		const isTokenExpired = isAccessTokenExpired(appContext.contextUPN);
		this.setState({ isTokenRenewing: isTokenExpired });
		isAccessTokenRenewing(isTokenExpired).then(() => {
			this.setState({ isTokenRenewing: false });
			DownloadFile(file, downloadCompleted, failtoDownload, classId);
		});
	};

	render() {
		if (!this.props.showPopUp) {
			return <></>;
		}

		const { OnClosePopUp, appContext } = this.props;
		const { topic, startUploadingFiles, filesToAdd } = this.state;
		const selectedAssignment = this.state.selectedAssignment;
		const selectedHomeWork = this.state.selectedHomeWork;

		let primaryFileName = selectedAssignment?.attachments?.map((at, index) => ({ key: at.id, content: at.fileName, connectedAssignment: selectedAssignment.id, type: 'assignment' })) || [];
		primaryFileName.push(...this._primaryFilename);
		const secondFilename = selectedHomeWork?.attachments?.map((at, index) => ({ key: at.id, content: at.fileName, connectedAssignment: selectedHomeWork.id, type: 'homework' })) || [];
		secondFilename.push(...this._secondaryFilename);

		if (topic.topicStatus == TopicStatus.published) {
			topic?.attachments?.forEach((x) => {
				if ((x as any)?.url?.indexOf("Draft")) {
					(x as any).url = (x as any).url.replace("/Draft/", "/General/");
				}
			});
		}
		const initialtopic = JSON.stringify(topic);
		const onEdit = () => {
			const t = topic;
			t.isViewMode = false;
			this.setState({ topic: t });
		};
		const onClose = () => {
			if (this.isPropsChanged) {
				this.setState({ cancelConfirmation: true });
			} else {
				alertValue.show = false;
				OnClosePopUp();
			}
		};
		const widthHundred = { width: "100%" };
		const isView = topic.isViewMode;
		const isDraft = topic.topicStatus === TopicStatus.draft ? true : false;

		const isEdit = topic.id;
		const getToolTip = (trans: Strings) => {
			let message = trans.pleaseSelect + " ";
			return (message += topic.title.trim() === "" ? trans.topic : !topic.classId || topic.classId === "0" ? trans.class : topic.startDate === topic.endDate ? trans.endDateMessage : !topic.addedWorkMethods ? trans.workMethods : !topic.specialFocusDescription || topic.specialFocusDescription === "<p><br></p>" ? trans.specialFocusTopic : "");
		};

		const topicEvents = (s: Strings) => {
			const data = this.state.topicHomeWorks;
			if (data.length > 0) {
				data.sort(
					(a: Homework, b: Homework) => new Date(a?.lessonDue).getTime() - new Date(b?.lessonDue).getTime()
				);
			}
			const items = data.map((ev) => {
				return {
					key: ev.id,
					header: (
						<span className="assignmentTitle">
							{GetDate(ev?.lessonDue) + " " + (ConvertDateByLocale(ev?.lessonDue))}
						</span>
					),
					content: !(ev?.topicIDName && ev?.topicIDName?.id?.length > 0) ? s.homeworkConnectedTopic
						: s.noHomeworkForLesson,
					styles: !(ev?.topicIDName && ev?.topicIDName?.id?.length > 0) ? { 'border': '1px solid red', 'margin-top': '2px' } : undefined,
					attachment: ev.attachments


				};
			});
			return items.length > 0
				? items
				: [{ key: "topic-0", header: s.emptyListMessage }];
		};

		const topicAssignments = (gradeChart, s: Strings) => {
			let items = this.state.topicAssignments?.map((a: AssignmentInterface) => {
				if (!(this.props.user.primaryRole === "student" && a.assignmentStatus === AssignmentStatus.Draft)) {
					const icon = a.assignmentStatus === AssignmentStatus.Draft
						? "p1 draft"
						: "p1 list-active";
					const classInfo = [gradeChart.find((g) => g.id === a.gradeType).name]
						.filter((s) => s !== "")
						.join(" - ");
					return {
						key: a.id,
						media: <Icon name="files-txt" className={icon} />,
						header: <span className="assignmentTitle">{a.title}</span>,
						headerMedia: (
							<span className="text-nowrap" title={s.deadline}>
								{GetSmallDateFormat(a.dueDate)}
							</span>
						),
						content: classInfo,
					};
				}
			});
			items = items?.filter(Boolean);
			return items?.length > 0
				? items
				: [{ key: "topic-00", header: s.emptyListMessage }];
		};

		const footer = (trans: Strings) => {
			const buttons: React.ReactNode[] = [];
			buttons.push(
				<Button secondary onClick={onClose} content={trans.close} />
			);

			if (isDraft) {
				buttons.push(
					<Flex.Item push>
						<Button
							text
							name="saveasDraft"
							onClick={(e) => {
								this.SaveDraft(trans);
							}}
							content={trans.saveAsDraft}
							loading={this.state.saveTopicLoader}
						/>
					</Flex.Item>
				);
			}

			if (!isView) {

				buttons.push(
					<Flex.Item push={!isDraft}>
						<span
							title={CheckValidations(this.state.topic) && getToolTip(trans)}
						>
							<Button
								name="save"
								primary
								disabled={CheckValidations(this.state.topic)}
								content={
									this.topicStatus === "publish"
										? trans.republish
										: trans.saveAndPublish
								}
								onClick={(e) => {
									this.HandleSubmit(trans);
								}}
								title={CheckValidations(this.state.topic) && getToolTip(trans)}
							/>
						</span>
					</Flex.Item>
				);
			}
			if (appContext.userProfileData.primaryRole === "teacher" && isView) {
				buttons.push(
					<Flex.Item push>
						<Button primary onClick={onEdit} content={trans.edit} />
					</Flex.Item>
				);
			}
			return (
				<Flex gap={gap} padding={padding}>
					{buttons}
				</Flex>
			);
		};
		const getHeader = (trans: Strings) => {
			let heading: JSX.Element;
			let icon = " p-2 align-middle ";
			let headingText: string = isView
				? trans.viewTopic
				: !isView && isEdit
					? trans.editTopic
					: !isView && this.state.isCopy
						? trans.copyTopic
						: trans.addNewTopic;

			heading = (
				<h5 className="popUpHeaderColor">
					<i
						className={
							(topic.topicStatus === TopicStatus.published && !isEdit) || isView
								? "icon-topic active " + icon
								: "icon-topic_draft active" + icon
						}
					></i>
					{headingText}
				</h5>
			);
			return heading;
		};
		const isAttachment =
			topic && topic.attachments && topic.attachments.length > 0;
		const removeAttachment = (file: Files) => {
			if (
				topic.topicStatus === TopicStatus.published &&
				file.resourceType === "OneNote" &&
				!file.name
			) {
				return undefined;
			}
			return () => {
				this.DeleteDocument(file);
				this.nameOfFile = file.name;
			};
		};
		const classesIds = (context: AppState) =>
			this.state.isCopy
				? GetSearchPreferencesFor(
					context.contextUPN,
					context.IsStandAlone,
					context.groupid
				).classids
				: this.props.UserPreferredClasses;
		const popupContent = (appContext: AppState, strings: Strings) => {
			const topicEvent = topicEvents(appContext.s);
			const topicAssignment = topicAssignments(appContext.gradeChart, appContext.s);

			return (< div >
				<Notifications />
				<CancelConfirmation
					showPopUp={this.state.cancelConfirmation}
					message={strings.closeConfirmationTopic}
					onYesPopUp={() => {
						this.setState({ topic: this.props.Topic });
						OnClosePopUp();
						alertValue.show = false;
					}}
					onClosePopUp={() => this.setState({ cancelConfirmation: false })}
				/>
				<Flex gap={gap} padding={padding}>
					<Flex.Item grow>
						<TitleComponent
							isDark={appContext.isDark}
							HandleChange={(e) => {
								this.HandleChange(e);
								alertValue.show = false;
							}}
							title={topic.title}
							isView={isView}
						/>
					</Flex.Item>
					<Flex.Item grow>
						<ClassSelect
							enabled={isEdit ? true : false}
							classes={classesIds(appContext)}
							isView={isView}
							classInfo={Object.assign({ id: topic.classId }) as Classes}
							onClassSelect={(event) => {
								const ev = { target: { name: "classId", value: event } };
								this.HandleChange(ev);
								alertValue.show = false;

							}}
							isDark={appContext.isDark}
						/>
					</Flex.Item>
				</Flex>
				<Flex gap={gap} padding={padding}>
					<Flex.Item grow>
						<div style={widthHundred}>
							<Text content={strings.startDate} />
							<Icon
								name="star"
								className="requiredicon"
								color="red"
								size="smallest"
								hidden={isView}
							/>
							<Input
								className={
									appContext.isDark ? "textbox-bg-dark" : "textbox-bg-white"
								}
								fluid
								readOnly
								value={
									topic.startDate
										? GetDate(new Date(topic.startDate), appContext.userProfileData.locale)
										: null
								}
								hidden={!isView}
							/>
							{!isView && (
								<DatePicker
									showWeekNumbers
									selected={topic.startDate ? new Date(topic.startDate) : null}
									className={
										appContext.isDark
											? "form-control teamsdatepicker datetimepicker-dark"
											: "form-control teamsdatepicker"
									}
									placeholderText={
										appContext.userProfileData.locale === "en"
											? "MM/dd/yyyy"
											: "dd/MM/yyyy"
									}
									onChange={(e) => this.BindDates(e, "startDate")
									}
									locale={appContext.userProfileData.locale}
									dateFormat={
										appContext.userProfileData.locale === "en"
											? "MM/dd/yyyy"
											: "dd/MM/yyyy"
									}
									//minDate={TermStartDate(appContext.Term.startDate)}
									//maxDate={new Date(appContext.Term.endDate)}
									popperPlacement={datePickerPosition}
									popperModifiers={datePickerPlacement}
								/>
							)}
						</div>
					</Flex.Item>
					<Flex.Item grow>
						<div style={widthHundred}>
							<Text content={strings.endDate} />
							<Icon
								name="star"
								className="requiredicon"
								color="red"
								size="smallest"
								hidden={isView}
							/>
							<Input
								className={
									appContext.isDark ? "textbox-bg-dark" : "textbox-bg-white"
								}
								fluid
								readOnly
								value={
									topic.endDate
										? GetDate(
											new Date(topic.endDate),
											appContext.userProfileData.locale
										)
										: null
								}
								hidden={!isView}
							/>
							{!isView && (
								<DatePicker
									showWeekNumbers
									id="endDate"
									selected={topic.endDate ? new Date(topic.endDate) : null}
									className={
										appContext.isDark
											? "form-control teamsdatepicker datetimepicker-dark"
											: "form-control teamsdatepicker"
									}
									placeholderText={
										appContext.userProfileData.locale === "en"
											? "MM/dd/yyyy"
											: "dd/MM/yyyy"
									}
									onChange={(e) => this.BindDates(e, "endDate")}
									locale={appContext.userProfileData.locale}
									dateFormat={
										appContext.userProfileData.locale === "en"
											? "MM/dd/yyyy"
											: "dd/MM/yyyy"
									}
									minDate={
										topic.startDate ? new Date(topic.startDate) : new Date()
									}
									//maxDate={new Date(appContext.Term.endDate)}
									excludeDates={[new Date(topic.startDate)]}
									popperPlacement={datePickerPosition}
									popperModifiers={datePickerPlacement}
								/>
							)}
						</div>
					</Flex.Item>
				</Flex>
				<Flex gap={gap} padding={padding}>
					<Flex.Item grow>
						<div style={widthHundred}>
							<Text content={strings.workMethods} />
							<Icon
								name="star"
								className="requiredicon"
								color="red"
								size="smallest"
								hidden={isView}
							/>
							<Input
								fluid
								readOnly
								value={
									topic.addedWorkMethods &&
									topic.addedWorkMethods
										.split(",")
										.map((awm) => strings.workMethodOptins[+awm])
										.join(", ")
								}
								hidden={!isView}
								className={
									appContext.isDark ? "textbox-bg-dark" : "textbox-bg-white"
								}
							/>

							{!isView && (
								<Dropdown
									className={
										"w-100" + topic.addedWorkMethods
											? "ui-dropdown-selected"
											: "ui-dropdown-notselected"
									}
									search
									multiple
									value={
										topic.addedWorkMethods
											? topic.addedWorkMethods
												.split(",")
												.map((c) =>
													MapDataToDropdownItem(
														strings.workMethodOptins[+c],
														c + "",
														"",
														appContext.isDark
													)
												)
											: []
									}
									onChange={(e: React.SyntheticEvent, d: DropdownItemProps) => {
										if ((d as any).value) {
											const event = {
												target: {
													name: "addedWorkMethods",
													value: (d as any).value
														.map((v) => v.variables)
														.reduce((hw, val) => hw.concat(val), [])
														.map((i) => i.id)
														.join(","),
												},
											};
											this.HandleChange(event);
										}
									}}
									items={strings.workMethodOptins.map((c, i) =>
										MapDataToDropdownItem(c, i + "", "", appContext.isDark)
									)}
									placeholder={strings.startTyping}
									noResultsMessage={strings.noResultsMessage}
								/>
							)}
						</div>
					</Flex.Item>

				</Flex>
				<Flex gap={gap} padding={padding}>


					<Flex.Item grow>
						<>
							<Editor
								isDark={appContext.isDark}
								label={strings.specialFocusTopic}
								value={topic.specialFocusDescription}
								isMandatory={true}
								HandleEditor={(content, delta, source) =>
									this.HandleEditorChange(
										content,
										source,
										"specialFocusDescription"
									)
								}
								isView={isView}
							/>
						</>
					</Flex.Item>

				</Flex>



				<EditorColorPicker
					isDark={appContext.isDark}
					label={strings.description}
					textColorPicker={strings.colorPicker}
					value={topic.description}
					isMandatory={false}
					HandleEditor={(content, delta, source) =>
						this.HandleEditorChange(content, source, "description")
					}
					isView={isView}
					HandleColorPicker={(hex) => {
						this.setState({ topic: Object.assign({}, this.state.topic, { colorScheme: hex }) })

					}}
					colorScheme={this.props.Topic?.colorScheme}

				>



				</EditorColorPicker>





				<Flex gap={gap} padding={padding}>

					<Flex.Item grow>
						<>
							<div style={widthHundred}>
								<Segment className="segment-topic">
									<Text content="Primary" />
									<List items={primaryFileName} />
									<div className="add-button-topic" >
										<button onClick={() => {
											this.material = "Primary"
											this.setState({ showMaterialDialog: true })
										}}>+</button>
									</div>
								</Segment>
							</div>
						</>

					</Flex.Item>
					<Flex.Item grow>
						<>
							<div style={widthHundred}>
								<Segment className="segment-topic">
									<Text content="Secondry" />
									<List items={secondFilename} />
									<div className="add-button-topic" >
										<button onClick={() => {
											this.material = "Secondary"
											this.setState({ showMaterialDialog: true })
										}}>+</button>
									</div>
								</Segment>

							</div>


						</>
					</Flex.Item>
				</Flex>


				<Flex gap={gap} padding={padding}>
					<div style={widthHundred}>
						{(isAttachment || !isView) && (
							<Text content={strings.material} className="text-capitalize" />
						)}
						{isView && isAttachment && <br />}
						{isView &&
							isAttachment &&
							topic.attachments.map((file: any, index) => (
								<AttachedResources
									key={index}
									file={file}
									onClick={() => {
										this.handleClickToDownloadFile(
											file,
											strings.downloadCompleted,
											strings.failtoDownload,
											this.state.topic.classId
										);
									}}
									isEven={isEven(index)}
								/>
							))}
						{!isView && (
							<Resources
								Action="Topics"
								FolderName={this.state.topic.title}
								GroupId={this.state.topic.classId}
								onFileUpload={this.HandleUploadFile}
								startUploading={startUploadingFiles}
								onShowFile={this.HandleShowFile}
								fileToRemove={this.nameOfFile}
								isDraft={isDraft}
								filesToAdd={filesToAdd}
								onLoading={() => { }}
								contextUPN={appContext.contextUPN}
							>
								{isAttachment &&
									topic.attachments.map((file: any, index) => (
										<AttachedResources
											key={index}
											file={file}
											onClick={() => {
												this.handleClickToDownloadFile(
													file,
													strings.downloadCompleted,
													strings.failtoDownload,
													this.state.topic.classId
												);
											}}
											onRemove={removeAttachment(file)}
											isEven={isEven(index)}
										/>
									))}
							</Resources>
						)}
						<ConfirmationBox
							title={strings.deleteFile}
							showPopUp={this.state.confirmFileDelete}
							onYesPopUp={() => {
								this.ConfirmSharePointFileDeletion();
							}}
							message={strings.deleteFileMessage}
							confirmButtonText={strings.delete}
							loaderOnConfirm={this.state.fileDeletionLoader}
							onClosePopUp={() => {
								this.setState({ confirmFileDelete: false });
							}}
						/>
					</div>
				</Flex>


				<Flex gap={gap} padding={padding}>
					<Flex.Item grow>
						<div style={widthHundred}>
							{this.state.lessonLoader ? (
								<SkeletonTheme
									color={appContext.isDark ? "#1F1E1E" : "#F2F1F0"}
								>
									{" "}
									<div>
										<Skeleton height={31} count={3} />{" "}
									</div>
								</SkeletonTheme>
							) : (
								<>

									<Text content={appContext.s.lessons} />
									<List
										className={topicEvent.length > 3 && "group-card-scroll"}
										items={topicEvent}
										onSelectedIndexChange={(e, newProps: ListProps) => {
											const item = newProps.items[newProps.selectedIndex];
											if (item) {
												const Homework: Homework = this.state.topicHomeWorks.find(x => x.id == (item as any).key);
												if (Homework)
													this.setState({ selectedHomeWork: Homework })
											}

										}}
										selectedIndex={-1}
										selectable
									/>
								</>
							)}
						</div>
					</Flex.Item>
					<Flex.Item grow>
						<div style={widthHundred}>
							{this.state.assignmentLoader ? (
								<SkeletonTheme
									color={appContext.isDark ? "#1F1E1E" : "#F2F1F0"}
								>
									{" "}
									<div>
										<Skeleton height={31} count={3} />{" "}
									</div>
								</SkeletonTheme>
							) : (
								<>
									<Text content={appContext.s.assignments} />
									<List
										className={topicAssignment.length > 3 && "group-card-scroll"}
										items={topicAssignment}
										selectedIndex={-1}
										selectable
										onSelectedIndexChange={(index, newProps) => {
											const item = newProps.items[newProps.selectedIndex];
											if (item) {
												const assignment: AssignmentInterface = this.state.topicAssignments.find(x => x.id == (item as any).key);
												if (assignment)
													this.setState({ selectedAssignment: assignment })
											}
										}}
									/>
								</>
							)}
						</div>
					</Flex.Item>
				</Flex>


				<Flex gap={gap} padding={padding} hidden={!alertValue.show}>
					<div style={widthHundred}>
						<Alerts
							content={alertValue.content}
							show={alertValue.show}
							type={alertValue.type}
							close={this.HandleClose}
						/>
					</div>
				</Flex>
			</div >)
		};
		const message = (s: Strings) =>
			this.topicStatus === "draft"
				? s.saveDraftTopicToPublish
				: s.editPublishedTopic;
		const onDelete = () =>
			this.setState({ isDeleteTopicConfirmationPopup: true });

		return (
			<AppContext.Consumer>
				{(appContext) =>
					appContext && (
						<>
							<Dialog
								className="PopupDialogs"
								open={true}
								styles={{ justifySelf: "unset" }}
								headerAction={
									<HeaderAction
										onClose={onClose}
										onCopy={
											appContext.userProfileData.primaryRole === "teacher" &&
											isView &&
											!this.props.isFromTeams &&
											this.onCopy
										}
										onEdit={
											appContext.userProfileData.primaryRole === "teacher" &&
											isView &&
											onEdit
										}
										onDelete={
											topic.id !== "" &&
											appContext.userProfileData.primaryRole === "teacher" &&
											onDelete
										}
										onShare={
											appContext.userProfileData.primaryRole === "teacher" &&
											isView &&
											!this.props.isFromTeams &&
											this.onShare
										}
									/>
								}
								header={getHeader(appContext.s)}
								content={popupContent(appContext, appContext.s)}
								footer={footer(appContext.s)}
								onCancel={onClose}
							/>

							<ConfirmationBox
								showPopUp={this.state.isDeleteTopicConfirmationPopup}
								confirmButtonText={appContext.s.delete}
								onYesPopUp={() => {
									this.DeleteTopic(appContext, topic, OnClosePopUp);
								}}
								onClosePopUp={() =>
									this.setState({ isDeleteTopicConfirmationPopup: false })
								}
								title={appContext.s.deletingTopic}
								message={
									topic.id !== "" &&
									deleteTopicMessage(
										topic,
										appContext.classes.filter((cls) => {
											return cls.id === topic.classId;
										})[0],
										appContext.s
									)
								}
								loaderOnConfirm={this.state.deleteLoader}
							/>
							<ConfirmationBox
								title={appContext.s.publishTopic}
								showPopUp={this.state.isTopicConfirm}
								onYesPopUp={() => this.StartUpload(true)}
								message={message(appContext.s)}
								confirmButtonText={
									this.topicStatus === "publish"
										? appContext.s.republish
										: appContext.s.saveAndPublish
								}
								onClosePopUp={() => {
									this.HandleTopicConfirmation(false);
								}}
								loaderOnConfirm={this.state.saveTopicLoader}
							/>
							<ConfirmationBox
								showPopUp={this.state.isShowMergeConfirmPopUp}
								confirmButtonText={appContext.s.confirm}
								onYesPopUp={() => {
									this.FetchMatchTopicDetail(this.state.matchTopic);
								}}
								onClosePopUp={() => {
									this.HandleTopicMerge(false);
								}}
								title={appContext.s.mergeTopic}
								message={appContext.s.mergeTopicMessage}
							/>
							{this.state.showAllClasses && (
								<AllClasses
									showAllClasses={this.state.showAllClasses}
									closeAllClassesPopup={() => this.setallClassPopupState(false)}
									sharingClassMaterial={this.processSharingTopic.bind(this)}
									allTeacherClasses={appContext.totalClasses}
									classMemberId={topic.id}
									contextUPN={appContext.contextUPN}
									parentName="Topic"
								/>
							)}
							{this.state.isTokenRenewing ? <SilentTokenRefresh /> : null}
							{
								<AddTopicMetrial showPopUp={this.state.showMaterialDialog} saveChangeCallback={(e) => {
									if (this.material == "Primary") {
										this._primaryFilename.push({ key: "key" + this._primaryFilename.length, content: e.materialName, connectedAssignment: this.material, type: this.material })
										primaryFileName.push(...this._primaryFilename);
									}
									else if (this.material == "Secondary") {
										this._secondaryFilename.push({ key: "key" + this._secondaryFilename.length, content: e.materialName, connectedAssignment: this.material, type: this.material })
										secondFilename.push(...this._secondaryFilename);
									}


									this.setState({ showMaterialDialog: false })
								}} onCloseCallback={() => { this.setState({ showMaterialDialog: false }) }} />

							}
						</>
					)
				}
			</AppContext.Consumer >
		);
	}
	private async FetchMatchTopicDetail(topic: Topic) {

		topic.isViewMode = false;
		this.changeState(topic);
		this.HandleTopicMerge(false);
		this.setState({ isCopy: false }, () => {
			this.componentDidMount().then((res) => {
				this.componentDidMount();
			});
		});
	}

	private async DeleteTopic(
		appContext: AppState,
		topic: Topic,
		OnClosePopUp: () => void
	) {
		topic.topicStatus = 3;
		topic.requestType = "Update";
		const isTokenExpired = isAccessTokenExpired(appContext.contextUPN);
		this.setState(
			{ deleteLoader: true, topic, isTokenRenewing: isTokenExpired },
			() => {
				isAccessTokenRenewing(isTokenExpired).then(() => {
					SaveTopic(this.state.topic)
						.then((res) => {
							this.setState({ isTokenRenewing: false });
							if (res) {
								this.props.UpdateTopicList(res["topic"]);
								this.setState({
									isDeleteTopicConfirmationPopup: false,
									deleteLoader: false,
								});
							}
						})
						.catch((err) => {
							this.setState(
								{ isDeleteTopicConfirmationPopup: false, deleteLoader: false },
								() => {
									throw new Error(err);
								}
							);
						});
				});
			}
		);
	}

	HandleShowFile = (fileList: Files[]) => {
		const docs = HandleShowTopicFile(fileList, this.state.topic).attachments;
		this.setState({
			topic: Object.assign({}, this.state.topic, { attachments: docs }),
			filesToAdd: [],
			startUploadingFiles: false,
		});
	};

	HandleUploadFile = (fileList) => {
		const { topic, previousClassId } = this.state;
		this.setState({ startUploadingFiles: false });
		let temp = [];
		if (topic.attachments && topic.attachments.length > 0) {
			temp = topic.attachments.filter((x) => {
				if (x.id) return x;
			});
			if (fileList) {
				fileList.forEach((element: FileList) => {
					const index = temp.findIndex((t) => t.id === element["id"]);
					if (index < 0) temp.push(element);
				});
			}
		}
		this.setState(
			{
				topic: Object.assign({}, this.state.topic, {
					createdDate: new Date().toJSON(),
					requestType:
						this.state.topic.id === ""
							? "Add"
							: previousClassId
								? "TopicMovedToAnotherClass"
								: "Update",
					attachments: temp,
					previousClassId: previousClassId,
					topicStatus: topic.topicStatus
						? topic.topicStatus
						: TopicStatus.draft,
				}),
			},
			() => {
				this.ClearTopicAfterCreation();
			}
		);
	};
	async ClearTopicAfterCreation() {
		const { isCopy, topic, refId, refClassId } = this.state;
		const { appContext } = this.props;

		if (isCopy) {
			topic.active = false;
			topic.requestType = "Copy";
			topic.refClassId = refClassId;
			topic.refId = refId;
		}
		topic.locale = localStorage.getItem("locale");
		const isTokenExpired = isAccessTokenExpired(appContext.contextUPN);
		this.setState({ isTokenRenewing: isTokenExpired });
		isAccessTokenRenewing(isTokenExpired).then(async () => {
			const response = await SaveTopic(topic);
			response && this.props.UpdateTopicList(response["topic"]);
			this.setState({
				isTopicConfirm: false,
				saveTopicLoader: false,
				isCopy: false,
				refId: "",
				refClassId: "",
				isTokenRenewing: false,
			});
			this.props.OnClosePopUp();
		});
	}

	async ConfirmSharePointFileDeletion() {
		const { appContext } = this.props;
		const isTokenExpired = isAccessTokenExpired(appContext.contextUPN);
		this.setState({
			fileDeletionLoader: true,
			isTokenRenewing: isTokenExpired,
		});
		isAccessTokenRenewing(isTokenExpired).then(async () => {
			this.setState({ isTokenRenewing: false });
			const docs = await DeleteAttachment(
				this.state.topic.classId,
				this.state.topic.id,
				this.state.topic.attachments,
				this.tempFile,
				this.state.isCopy
			);
			this.AddDocumentsToTopic(docs);
		});
	}

	setallClassPopupState(showAllClasses: boolean) {
		this.setState({ showAllClasses });
	}
	async processSharingTopic(cls: ClassIdWithName) {
		const { topic } = this.state;
		let sharedTopic = Object.assign({}, topic);
		sharedTopic.refId = topic.id;
		sharedTopic.refClassId = topic.classId;
		sharedTopic.requestType = "Copy";
		sharedTopic.active = false;
		sharedTopic.topicStatus = TopicStatus.draft;
		sharedTopic.classId = cls.id;
		sharedTopic.isTopicFolderCreated = false;
		sharedTopic.attachments = topic.attachments.filter(
			(t) => t.resourceType !== "OneNote"
		);
		const { appContext } = this.props;
		const isTokenExpired = isAccessTokenExpired(appContext.contextUPN);
		this.setState({ isTokenRenewing: isTokenExpired });
		isAccessTokenRenewing(isTokenExpired).then(async () => {
			const response = await SaveTopic(sharedTopic);
			if (response) {
				const trans = this.props.appContext.s;
				response && this.props.UpdateTopicList(response["topic"]);
				let message = trans.yourMaterialHasBeenShared;
				message = message.replace("*1*", trans["topic"]);
				notify.show(`${message} ${cls.displayName}`, "success");
				this.setallClassPopupState(false);
			}
		});
	}
}
export default AddNewTopic;
